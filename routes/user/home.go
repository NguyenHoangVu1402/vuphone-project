package user

import (
	"github.com/gin-gonic/gin"
	"vuphone-project/utils"
)

// Cấu hình router cho home
func HomeRoutes(r *gin.Engine) {
	r.GET("/", func(c *gin.Context) {
		accessToken := c.Query("access_token")
        refreshToken := c.Query("refresh_token")

		isLoggedIn := accessToken != "" && refreshToken != ""
		utils.RenderTemplateUser(c, "home", "Trang chủ VuPhone",  isLoggedIn,)
	})
	r.GET("/info-account", func(c *gin.Context) {
		accessToken := c.Query("access_token")
        refreshToken := c.Query("refresh_token")

		isLoggedIn := accessToken != "" && refreshToken != ""
		utils.RenderTemplateUser(c, "info-account", "Thông tin người dùng VuPhone",  isLoggedIn,)
	})
}