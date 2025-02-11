package auth

import (
	"github.com/gin-gonic/gin"
	"vuphone-project/utils"
)

// Cấu hình router cho home
func LoginRoutes(r *gin.Engine) {
	r.GET("/loginVuPhone", func(c *gin.Context) {
		utils.RenderTemplateAuth(c, "login", "Login VuPhone")
	})
}