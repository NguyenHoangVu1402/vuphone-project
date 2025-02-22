package auth

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"vuphone-project/utils"
	"vuphone-project/controllers/api"
	"vuphone-project/middleware"
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
		//Register
		authGroup.GET("/days", api.GetDays)
		authGroup.GET("/months", api.GetMonths)
		authGroup.GET("/years", api.GetYears)
		authGroup.POST("/register", api.RegisterUser) // Đăng ký tài khoản
		authGroup.POST("/verify-otp", api.VerifyOTP)  // Xác thực OTP

		//Login
		authGroup.POST("/login", api.Login) // Đăng nhập tài khoản

		//Logout
		authGroup.POST("/logout", api.Logout) // Đăng xuất tài khoản

		//Info account
		authGroup.GET("/customer/info", api.GetUserInfo) // Lấy thông tin tài khoản
		
		// Refresh token
        authGroup.POST("/refresh-token", api.RefreshAccessToken) // Làm mới Access Token bằng Refresh Token
	}

	// Middleware xác thực
	authMiddleware := middleware.JWTMiddleware()

	// Route bảo vệ bởi Middleware xác thực
	protected := r.Group("/api/v1/auth/")
	protected.Use(authMiddleware)
	{
		protected.GET("/protected-endpoint", func(c *gin.Context) {
			// Logic xử lý cho endpoint được bảo vệ
			c.JSON(http.StatusOK, gin.H{"message": "Bạn đã truy cập vào endpoint được bảo vệ"})
		})
	}
} 