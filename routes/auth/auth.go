package auth

import (
	"github.com/gin-gonic/gin"
	"vuphone-project/utils"
	"vuphone-project/controllers/api"
	//"vuphone-project/middleware"
)

// Cấu hình router cho home
func AuthRoutes(r *gin.Engine) {
	r.GET("/loginvuphone", func(c *gin.Context) {
		utils.RenderTemplateAuth(c, "login", "Đăng nhập VuPhone")
	})
	r.GET("/registervuphone", func(c *gin.Context) {
		utils.RenderTemplateAuth(c, "register", "Đăng ký VuPhone")
	})
	r.GET("/passwordrecoveryvuphone", func(c *gin.Context) {
		utils.RenderTemplateAuth(c, "passwordrecovery", "Khôi phục mật khẩu VuPhone")
	})
	r.GET("/verifyotpvuphone", func(c *gin.Context) {
		utils.RenderTemplateAuth(c, "verifyotp", "Xác nhận mã OTP VuPhone")
	})

	//api
	authGroup := r.Group("/api/v1/auth")
	{
		authGroup.GET("/days", api.GetDays)
		authGroup.GET("/months", api.GetMonths)
		authGroup.GET("/years", api.GetYears)
		authGroup.POST("/register", api.RegisterUser) // Đăng ký tài khoản
		authGroup.POST("/verify-otp", api.VerifyOTP)  // Xác thực OTP
	}
} 