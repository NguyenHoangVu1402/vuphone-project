package api

import (
	"net/http"
	"time"
	"vuphone-project/config"
	"vuphone-project/models"
	"vuphone-project/utils"
	"log"
	"github.com/gin-gonic/gin"
	"github.com/gofrs/uuid"
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
	birthDate, err := time.Parse("2006-1-2", input.BirthDate) // Chấp nhận cả "2001-2-14"
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
		Password:  input.Password, // Mật khẩu sẽ được mã hóa trong `BeforeCreate`
		Gender:    input.Gender,
		BirthDate: birthDate,
		Points: 0,
		Avatar: "/static/admin/images/avatar/avatar.png",
		RoleID:    role.ID,
		IsVerified: false,
	}

	if err := config.DB.Create(&newUser).Error; err != nil {
		log.Println("Lỗi khi tạo user:", err) // Thêm log lỗi này
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

	c.JSON(http.StatusOK, gin.H{"message": "Kiểm tra Email để lấy mã OTP", "user_id": newUser.ID,})
}


func VerifyOTP(c *gin.Context) {
	var input struct {
		UserID uuid.UUID `json:"user_id" binding:"required"`
		OTP    string    `json:"otp" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Kiểm tra OTP
	var otp models.OTP
	if err := config.DB.Where("user_id = ? AND code = ?", input.UserID, input.OTP).First(&otp).Error; err != nil {
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
	if err := config.DB.First(&user, input.UserID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Người dùng không tồn tại"})
		return
	}

	// Cập nhật trạng thái tài khoản
	if err := config.DB.Model(&user).Update("is_verified", true).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể cập nhật trạng thái tài khoản"})
		return
	}

	// Xóa tất cả OTP của user sau khi xác thực thành công
	config.DB.Where("user_id = ?", input.UserID).Delete(&models.OTP{})


	// Gửi email chúc mừng
	if err := utils.SendEmail(user.Email, "Chào mừng bạn đến với VuPhone!", "Cảm ơn bạn đã đăng ký tài khoản thành công!"); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi gửi email chúc mừng"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Xác thực OTP thành công. Tài khoản đã được kích hoạt!"})
}


