package auth

import (
	"github.com/gin-gonic/gin"
	"vuphone-project/utils"
)

// Cấu hình router cho home
func LoginRoutes(r *gin.Engine) {
	r.GET("/loginvuphone", func(c *gin.Context) {
		utils.RenderTemplateAuth(c, "login", "Login VuPhone")
	})
	r.GET("/registervuphone", func(c *gin.Context) {
		utils.RenderTemplateAuth(c, "register", "Register VuPhone")
	})
} 