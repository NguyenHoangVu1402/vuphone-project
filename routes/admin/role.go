package admin

import (
	"github.com/gin-gonic/gin"
	"vuphone-project/controllers/api"
	"vuphone-project/utils"
)

// Cấu hình router cho Role
func RoleRoutes(r *gin.Engine) {
	roleGroup := r.Group("/admin/roles")
	{
		roleGroup.GET("/", func(c *gin.Context) {
			utils.RenderTemplateAdmin(c, "Role/index", "Danh sách role VuPhone")
		})
		roleGroup.GET("/create", func(c *gin.Context) {
			utils.RenderTemplateAdmin(c, "Role/create", "Tạo role VuPhone")
		})
		/*-------------------------------API----------------------------------------*/
		roleGroup.POST("/createRole", api.CreateRoles)
		roleGroup.GET("/indexRole", api.GetAllRoles)
		roleGroup.PUT("/updateRole/:id", api.UpdateRoles)
		roleGroup.DELETE("/deleteRole/:id", api.DeleteRoles)
		roleGroup.GET("/searchRole", api.SearchRoles)
	}
}
