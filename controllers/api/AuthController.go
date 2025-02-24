package api

import (
	"encoding/base64"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"
	"vuphone-project/config"
	"vuphone-project/middleware"
	"vuphone-project/models"
	"vuphone-project/utils"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/gofrs/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
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
		Gender    string `json:"gender" binding:"required,oneof=Nam Nữ"`
		BirthDate string `json:"birth_date" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		log.Println("Lỗi bind JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dữ liệu đầu vào không hợp lệ"})
		return
	}

	// Kiểm tra độ dài mật khẩu
	if len(input.Password) < 8 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mật khẩu phải dài ít nhất 8 ký tự"})
		return
	}

	// Kiểm tra ký tự đặc biệt với regex
	specialCharRegex := regexp.MustCompile(`[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]`)
	if !specialCharRegex.MatchString(input.Password) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"})
		return
	}

	// Kiểm tra chữ cái in hoa với regex
	upperCaseRegex := regexp.MustCompile(`[A-Z]`)
	if !upperCaseRegex.MatchString(input.Password) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mật khẩu phải chứa ít nhất một chữ cái in hoa"})
		return
	}

	phoneRegex := regexp.MustCompile(`^(03|05|07|08|09)[0-9]{8}$`)
	if !phoneRegex.MatchString(input.Phone) { 
		c.JSON(http.StatusBadRequest, gin.H{"error": "Số điện thoại không hợp lệ. Phải là số Việt Nam 10 chữ số bắt đầu bằng 03, 05, 07, 08, hoặc 09"})
		return
	}

	if input.Username == input.Password || strings.Contains(strings.ToLower(input.Password), strings.ToLower(input.Username)) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mật khẩu không được trùng với username hoặc chứa username"})
		return
	}

	birthDate, err := time.Parse("2006-01-02", input.BirthDate)
	if err != nil {
		log.Println("Lỗi parse ngày sinh:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Định dạng ngày sinh không hợp lệ, hãy sử dụng YYYY-MM-DD"})
		return
	}

	if time.Now().Year()-birthDate.Year() < 13 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bạn phải từ 13 tuổi trở lên để đăng ký"})
		return
	}

	tx := config.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	for _, field := range []struct {
		key   string
		value string
	}{
		{"email", input.Email},
		{"phone", input.Phone},
		{"username", input.Username},
	} {
		if field.value != "" {
			var existingUser models.User
			if err := tx.Where(field.key+" = ?", field.value).First(&existingUser).Error; err == nil {
				tx.Rollback()
				c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("%s đã tồn tại", field.key)})
				return
			}
		}
	}

	var role models.Role
	if err := tx.Where("name = ?", "user").First(&role).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi hệ thống khi lấy vai trò"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi hệ thống khi mã hóa mật khẩu"})
		return
	}
	log.Printf("Debug - Mật khẩu đã mã hóa: %s", string(hashedPassword))
	newUser := models.User{
		Name:       input.Name,
		Email:      input.Email,
		Phone:      input.Phone,
		Username:   input.Username,
		Password:   string(hashedPassword),
		Gender:     input.Gender,
		BirthDate:  birthDate,
		Points:     0,
		Avatar:     "/static/admin/images/avatar/avatar.png",
		RoleID:     role.ID,
		IsVerified: false,
	}

	if err := tx.Create(&newUser).Error; err != nil {
		tx.Rollback()
		log.Println("Lỗi khi tạo user:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể tạo tài khoản mới"})
		return
	}

	otpCode := utils.GenerateOTP()
	otp := models.OTP{
		UserID:    newUser.ID,
		Code:      otpCode,
		ExpiresAt: time.Now().Add(5 * time.Minute),
	}

	if err := tx.Create(&otp).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể tạo OTP"})
		return
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi hệ thống khi lưu dữ liệu"})
		return
	}

	err = utils.SendEmail(newUser.Email, "Mã OTP của bạn", "Mã OTP: "+otpCode)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể gửi email OTP"})
		return
	}

	// Tạo JWT token cho OTP
	claims := jwt.MapClaims{
		"user_id": newUser.ID.String(),
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(middleware.LoadEnv()) // Dùng secretKey từ middleware
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi tạo token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Kiểm tra Email để lấy mã OTP", "token": tokenString})
}

func VerifyOTP(c *gin.Context) {
	var input struct {
		Token string `json:"token" binding:"required"`
		OTP   string `json:"otp" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dữ liệu đầu vào không hợp lệ"})
		return
	}

	// Xác thực JWT token
	token, err := jwt.Parse(input.Token, func(token *jwt.Token) (interface{}, error) {
		return middleware.LoadEnv(), nil
	})
	if err != nil || !token.Valid {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Token không hợp lệ"})
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Token không hợp lệ"})
		return
	}

	userIDStr, ok := claims["user_id"].(string)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Token không chứa user_id hợp lệ"})
		return
	}

	userID, err := uuid.FromString(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Token không hợp lệ"})
		return
	}

	tx := config.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	var otp models.OTP
	if err := tx.Where("user_id = ? AND code = ?", userID, input.OTP).First(&otp).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mã OTP không hợp lệ hoặc đã hết hạn"})
		return
	}

	if time.Now().After(otp.ExpiresAt) {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mã OTP đã hết hạn"})
		return
	}

	var user models.User
	if err := tx.First(&user, userID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"error": "Người dùng không tồn tại"})
		return
	}

	if err := tx.Model(&user).Update("is_verified", true).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể cập nhật trạng thái tài khoản"})
		return
	}

	if err := tx.Where("user_id = ?", userID).Delete(&models.OTP{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi xóa OTP"})
		return
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi hệ thống khi xác thực"})
		return
	}

	if err := utils.SendEmail(user.Email, "Chào mừng bạn đến với VuPhone!", "Cảm ơn bạn đã đăng ký tài khoản thành công!"); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Xác thực thành công nhưng lỗi gửi email chúc mừng"})
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

	if len(input.Password) < 8 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mật khẩu phải dài ít nhất 8 ký tự"})
		return
	}

	// Kiểm tra chữ cái in hoa với regex
	upperCaseRegex := regexp.MustCompile(`[A-Z]`)
	if !upperCaseRegex.MatchString(input.Password) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mật khẩu phải chứa ít nhất một chữ cái in hoa"})
		return
	}

	var user models.User
	if err := config.DB.Where("username = ?", input.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Tên đăng nhập không chính xác!"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Mật khẩu không chính xác!"})
		return
	}

	if !user.IsVerified {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Tài khoản chưa được xác thực"})
		return
	}

	accessToken, err := middleware.CreateAccessToken(user.ID, config.DB)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể tạo Access Token"})
		return
	}

	refreshToken, err := middleware.CreateRefreshToken(user.ID, config.DB)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể tạo Refresh Token"})
		return
	}

	var role models.Role
	if err := config.DB.Where("id = ?", user.RoleID).First(&role).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể lấy thông tin Role"})
		return
	}

	if role.Name == "user" {
		c.JSON(http.StatusOK, gin.H{
			"message":       "Đăng nhập thành công!",
			"access_token":  accessToken,
			"refresh_token": refreshToken,
			"url":           "/",
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"message":       "Đăng nhập thành công!",
			"access_token":  accessToken,
			"refresh_token": refreshToken,
			"url":           "/dashboard",
		})
	}
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

	if err := config.DB.Where("access_token = ?", input.AccessToken).Delete(&models.AccessToken{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể xóa Access Token"})
		return
	}

	if err := config.DB.Where("refresh_token = ?", input.RefreshToken).Delete(&models.RefreshToken{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể xóa Refresh Token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Đăng xuất thành công"})
}

func GetUserInfo(c *gin.Context) {
	tokenString := c.Request.Header.Get("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token không được cung cấp"})
		return
	}

	tokenString = strings.TrimPrefix(tokenString, "Bearer ")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return middleware.LoadEnv(), nil
	})
	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token không hợp lệ"})
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token không hợp lệ"})
		return
	}

	userIDStr, ok := claims["user_id"].(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user_id không hợp lệ"})
		return
	}

	userID, err := uuid.FromString(userIDStr)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user_id không hợp lệ"})
		return
	}

	var user models.User
	if err := config.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Người dùng không tồn tại"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi khi truy vấn cơ sở dữ liệu"})
		}
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

func saveAvatarFromBase64(base64Str string, userID string) (string, error) {
	parts := strings.Split(base64Str, ",")
	if len(parts) != 2 {
		return "", fmt.Errorf("invalid Base64 string")
	}
	base64Data := parts[1]

	decoded, err := base64.StdEncoding.DecodeString(base64Data)
	if err != nil {
		return "", err
	}

	fileName := fmt.Sprintf("%s_%d.png", userID, time.Now().Unix())
	savePath := filepath.Join("static", "user", "images", "avatar", fileName)

	err = os.MkdirAll(filepath.Dir(savePath), os.ModePerm)
	if err != nil {
		return "", err
	}

	err = os.WriteFile(savePath, decoded, 0644)
	if err != nil {
		return "", err
	}

	return "/static/user/images/avatar/" + fileName, nil
}

type UpdateProfileRequest struct {
	Name      string `json:"name" binding:"required"`
	Gender    string `json:"gender" binding:"required,oneof=Nam Nữ"`
	BirthDate string `json:"birth_date" binding:"required"`
	Email     string `json:"email" binding:"required,email"`
	Phone     string `json:"phone" binding:"required"`
	Avatar    string `json:"avatar"`
}

func UpdateProfile(c *gin.Context) {
	tokenString := c.Request.Header.Get("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token không được cung cấp"})
		return
	}

	tokenString = strings.TrimPrefix(tokenString, "Bearer ")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return middleware.LoadEnv(), nil
	})
	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token không hợp lệ"})
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token không hợp lệ"})
		return
	}

	userIDStr, ok := claims["user_id"].(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user_id không hợp lệ"})
		return
	}

	userID, err := uuid.FromString(userIDStr)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user_id không hợp lệ"})
		return
	}

	var user models.User
	if err := config.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Người dùng không tồn tại"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi khi truy vấn cơ sở dữ liệu"})
		}
		return
	}

	var req UpdateProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Println("Lỗi bind JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dữ liệu không hợp lệ: " + err.Error()})
		return
	}

	birthDate, err := time.Parse("2006-01-02", req.BirthDate)
	if err != nil {
		log.Println("Lỗi parse ngày sinh:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Định dạng ngày sinh không hợp lệ, hãy sử dụng YYYY-MM-DD"})
		return
	}

	var existingEmailUser models.User
	if err := config.DB.Where("email = ? AND id != ?", req.Email, user.ID).First(&existingEmailUser).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email đã được sử dụng bởi người dùng khác"})
		return
	}

	var existingPhoneUser models.User
	if err := config.DB.Where("phone = ? AND id != ?", req.Phone, user.ID).First(&existingPhoneUser).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Số điện thoại đã được sử dụng bởi người dùng khác"})
		return
	}

	avatar := user.Avatar
	if req.Avatar != "" {
		if strings.HasPrefix(req.Avatar, "data:image") {
			filePath, err := saveAvatarFromBase64(req.Avatar, user.ID.String())
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi khi lưu avatar"})
				return
			}
			avatar = filePath
		} else {
			avatar = req.Avatar
		}
	}

	user.Name = req.Name
	user.Gender = req.Gender
	user.BirthDate = birthDate
	user.Email = req.Email
	user.Phone = req.Phone
	user.Avatar = avatar

	if err := config.DB.Save(&user).Error; err != nil {
		log.Println("Lỗi khi cập nhật user:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể cập nhật thông tin"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Cập nhật thông tin thành công",
		"data": gin.H{
			"id":         user.ID,
			"name":       user.Name,
			"username":   user.Username,
			"email":      user.Email,
			"phone":      user.Phone,
			"birth_date": user.BirthDate.Format("2006-01-02"),
			"gender":     user.Gender,
			"avatar":     user.Avatar,
			"points":     user.Points,
		},
	})
}
