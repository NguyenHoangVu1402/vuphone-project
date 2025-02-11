package user

import (
	"github.com/gin-gonic/gin"
	"vuphone-project/utils"
)

// Cấu hình router cho home
func HomeRoutes(r *gin.Engine) {
	r.GET("/", func(c *gin.Context) {
		utils.RenderTemplateUser(c, "home", "Home VuPhone")
	})
}