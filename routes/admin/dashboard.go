package admin

import (
	"github.com/gin-gonic/gin"
	"vuphone-project/utils"
)

// Cấu hình router cho dashboard
func DashboardRoutes(r *gin.Engine) {
	r.GET("/dashboard", func(c *gin.Context) {
		utils.RenderTemplateAdmin(c, "dashboard", "Dashboard VuPhone")
	})
}