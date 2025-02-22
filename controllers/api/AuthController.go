package api

import (
	"net/http"
	"time"
	"vuphone-project/config"
	"vuphone-project/models"
	"vuphone-project/utils"
	"log"
	"fmt"
	"gorm.io/gorm"
	"github.com/gin-gonic/gin"
	"github.com/gofrs/uuid"
	"encoding/base64"

)

// API lấy ngày
func GetDays(c *gin.Context) {
	days := make([]int, 31)
	for i := 0; i < 31; i++ {
		days[i] = i + 1
	}
	c.JSON(http.StatusOK, days)
}

// Lấy danh sách tháng (1-12)
func GetMonths(c *gin.Context) {
	months := make([]int, 12)
	for i := 0; i < 12; i++ {
		months[i] = i + 1
	}
	c.JSON(http.StatusOK, months)
}

// Lấy danh sách năm (1900 - hiện tại)
func GetYears(c *gin.Context) {
	currentYear := time.Now().Year()
	var years []int
	for i := 1900; i <= currentYear; i++ {
		years = append(years, i)
	}
	c.JSON(http.StatusOK, years)
}


func RegisterUser(c *gin.Context) {
	var input struct {
		Name      string `json:"name" binding:"required"`
		Email     string `json:"email" binding:"required,email"`
		Phone     string `json:"phone"`
		Username  string `json:"username" binding:"required"`
		Password  string `json:"password" binding:"required"`
		Gender    string `json:"gender"  binding:"required,oneof=Nam Nữ"`
		BirthDate string `json:"birth_date" binding:"required"`
	}

	// Kiểm tra dữ liệu đầu vào
	if err := c.ShouldBindJSON(&input); err != nil {
		log.Println("Lỗi bind JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	
	// Kiểm tra định dạng ngày sinh
	birthDate, err := time.Parse("2006-1-2", input.BirthDate)
	if err != nil {
		log.Println("Lỗi parse ngày sinh:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Định dạng ngày sinh không hợp lệ, hãy sử dụng YYYY-MM-DD"})
		return
	}

	// Cập nhật lại ngày sinh với format chuẩn
	input.BirthDate = birthDate.Format("2006-01-02")

	// Kiểm tra Email đã tồn tại chưa
	var existingUser models.User
	if err := config.DB.Where("email = ?", input.Email).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email đã tồn tại"})
		return
	}

	// Kiểm tra số điện thoại đã tồn tại chưa
	var existingPhone models.User
	if err := config.DB.Where("phone = ?", input.Phone).First(&existingPhone).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Số điện thoại đã được sử dụng"})
		return
	}

	var existingUsername models.User
	if err := config.DB.Where("username = ?", input.Username).First(&existingUsername).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tên đăng nhập đã tồn tại"})
		return
	}

	// Lấy RoleID của "user"
	var role models.Role
	if err := config.DB.Where("name = ?", "user").First(&role).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi hệ thống"})
		return
	}

	// Tạo User
	newUser := models.User{
		Name:      input.Name,
		Email:     input.Email,
		Phone:     input.Phone,
		Username:  input.Username,
		Password:  input.Password,
		Gender:    input.Gender,
		BirthDate: birthDate,
		Points:    0,
		Avatar:    "/static/admin/images/avatar/avatar.png",
		RoleID:    role.ID,
		IsVerified: false,
	}

	if err := config.DB.Create(&newUser).Error; err != nil {
		log.Println("Lỗi khi tạo user:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể tạo tài khoản mới"})
		return
	}

	// Tạo mã OTP
	otpCode := utils.GenerateOTP()
	otp := models.OTP{
		UserID:    newUser.ID,
		Code:      otpCode,
		ExpiresAt: time.Now().Add(5 * time.Minute),
	}

	config.DB.Create(&otp)

	// Gửi OTP qua email
	err = utils.SendEmail(newUser.Email, "Mã OTP của bạn", "Mã OTP: "+otpCode)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể gửi email OTP"})
		return
	}

	// Mã hóa user_id
    token := base64.StdEncoding.EncodeToString([]byte(newUser.ID.String()))

	c.JSON(http.StatusOK, gin.H{"message": "Kiểm tra Email để lấy mã OTP", "token": token})
}



func VerifyOTP(c *gin.Context) {
    var input struct {
        Token string `json:"token" binding:"required"`
        OTP   string `json:"otp" binding:"required"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Giải mã token để lấy user_id
    userIDBytes, err := base64.StdEncoding.DecodeString(input.Token)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Token không hợp lệ"})
        return
    }
    userID, err := uuid.FromString(string(userIDBytes))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Token không hợp lệ"})
        return
    }

    // Kiểm tra OTP
    var otp models.OTP
    if err := config.DB.Where("user_id = ? AND code = ?", userID, input.OTP).First(&otp).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Mã OTP không hợp lệ hoặc đã hết hạn"})
        return
    }

    // Kiểm tra OTP đã hết hạn chưa
    if time.Now().After(otp.ExpiresAt) {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Mã OTP đã hết hạn"})
        return
    }

    // Lấy thông tin User
    var user models.User
    if err := config.DB.First(&user, userID).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Người dùng không tồn tại"})
        return
    }

    // Cập nhật trạng thái tài khoản
    if err := config.DB.Model(&user).Update("is_verified", true).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể cập nhật trạng thái tài khoản"})
        return
    }

    // Xóa tất cả OTP của user sau khi xác thực thành công
    config.DB.Where("user_id = ?", userID).Delete(&models.OTP{})

    // Gửi email chúc mừng
    if err := utils.SendEmail(user.Email, "Chào mừng bạn đến với VuPhone!", "Cảm ơn bạn đã đăng ký tài khoản thành công!"); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi gửi email chúc mừng"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Xác thực OTP thành công. Tài khoản đã được kích hoạt!"})
}


func Login(c *gin.Context) {
    var input struct {
        Username string `json:"username" binding:"required"`
        Password string `json:"password" binding:"required"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Dữ liệu không hợp lệ"})
        return
    }

    var user models.User
    if err := config.DB.Where("username = ?", input.Username).First(&user).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Tên đăng nhập không chính xác!"})
        return
    }

    // Kiểm tra mật khẩu
    if !utils.CheckPasswordHash(input.Password, user.Password) {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Mật khẩu không chính xác!"})
        return
    }

    // Kiểm tra tài khoản đã xác minh chưa
    if !user.IsVerified {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Tài khoản chưa được xác thực"})
        return
    }

    // Tạo Access Token
    accessToken, err := CreateAccessToken(user.ID, config.DB)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể tạo Access Token"})
        return
    }

    // Tạo Refresh Token
    refreshToken, err := CreateRefreshToken(user.ID, config.DB)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể tạo Refresh Token"})
        return
    }


    c.JSON(http.StatusOK, gin.H{
		"message":      "Đăng nhập thành công!",
		"access_token": accessToken,
		"refresh_token": refreshToken,		
	})
}


func CreateAccessToken(userID uuid.UUID, db *gorm.DB) (string, error) {
	// Tạo access token mới
	accessTokenUUID, err := uuid.NewV4()
	if err != nil {
		return "", err
	}
	accessToken := accessTokenUUID.String()
	expiration := time.Now().Add(time.Minute * 15) // Token có hiệu lực trong 15 phút

	// Lưu access token vào cơ sở dữ liệu
	token := models.AccessToken{
		UserID:      userID,
		AccessToken: accessToken,
		ExpiresAt:   expiration,
	}

	if err := db.Create(&token).Error; err != nil {
		return "", err
	}

	return accessToken, nil
}

func CreateRefreshToken(userID uuid.UUID, db *gorm.DB) (string, error) {
	// Generate a new UUID and handle the error
	refreshUUID, err := uuid.NewV4()
	if err != nil {
		return "", err
	}
	refreshToken := refreshUUID.String()

	// Set expiration for 7 days
	expiration := time.Now().Add(time.Hour * 24 * 7)

	// Save the refresh token to the database
	token := models.RefreshToken{
		UserID:       userID,
		RefreshToken: refreshToken,
		ExpiresAt:    expiration,
	}

	// Save the token to DB
	if err := db.Create(&token).Error; err != nil {
		return "", err
	}

	return refreshToken, nil
}

func ValidateAccessToken(accessToken string, db *gorm.DB) (*models.AccessToken, error) {
	var token models.AccessToken
	// Tìm access token trong cơ sở dữ liệu
	if err := db.Where("access_token = ?", accessToken).First(&token).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, fmt.Errorf("access token không tồn tại")
		}
		return nil, err
	}

	// Kiểm tra thời gian hết hạn
	if token.ExpiresAt.Before(time.Now()) {
		return nil, fmt.Errorf("access token đã hết hạn")
	}

	return &token, nil
}

func RefreshAccessToken(c *gin.Context) {
    var input struct {
        RefreshToken string `json:"refresh_token" binding:"required"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Dữ liệu không hợp lệ"})
        return
    }

    newAccessToken, err := refreshAccessToken(input.RefreshToken, config.DB)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"access_token": newAccessToken})
}

func refreshAccessToken(refreshToken string, db *gorm.DB) (string, error) {
    var token models.RefreshToken
    if err := db.Where("refresh_token = ?", refreshToken).First(&token).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            return "", fmt.Errorf("refresh token không tồn tại")
        }
        return "", err
    }

    if token.ExpiresAt.Before(time.Now()) {
        return "", fmt.Errorf("refresh token đã hết hạn")
    }

    accessToken, err := CreateAccessToken(token.UserID, db)
    if err != nil {
        return "", fmt.Errorf("không thể tạo Access Token mới: %v", err)
    }

    if err := db.Delete(&token).Error; err != nil {
        return "", fmt.Errorf("không thể xóa Refresh Token cũ: %v", err)
    }

    return accessToken, nil
}

func Logout(c *gin.Context) {
    var input struct {
        AccessToken  string `json:"access_token" binding:"required"`
        RefreshToken string `json:"refresh_token" binding:"required"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Dữ liệu không hợp lệ"})
        return
    }

    // Soft delete Access Token khỏi cơ sở dữ liệu
    if err := config.DB.Where("access_token = ?", input.AccessToken).Delete(&models.AccessToken{}).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể xóa Access Token"})
        return
    }

    // Soft delete Refresh Token khỏi cơ sở dữ liệu
    if err := config.DB.Where("refresh_token = ?", input.RefreshToken).Delete(&models.RefreshToken{}).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể xóa Refresh Token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Đăng xuất thành công"})
}


func GetUserInfo(c *gin.Context) {
	tokenString := c.Request.Header.Get("Authorization")

	// Xác thực JWT token và lấy chi tiết người dùng
	claims, err := utils.ValidateJWT(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
        return
	}

	// Tra cứu thông tin người dùng từ cơ sở dữ liệu
	var user models.User
	if err := config.DB.Where("id = ?", claims.UserID).First(&user).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

	c.JSON(http.StatusOK, gin.H{
		"id":         user.ID,
        "name":       user.Name,
        "username":   user.Username,
        "email":      user.Email,
        "role_id":    user.RoleID,
        "avatar":     user.Avatar,
        "phone":      user.Phone,
        "birth_date": user.BirthDate.Format("2006-01-02"),
        "gender":     user.Gender,
        "points":     user.Points,
	})
}