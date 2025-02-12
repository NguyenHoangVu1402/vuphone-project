package admin

import (
	"github.com/gin-gonic/gin"
	"vuphone-project/controllers/api"
	"vuphone-project/utils"
)

// Cấu hình router cho danh mục
func CategoryRoutes(r *gin.Engine) {
	categoryGroup := r.Group("/admin/categories")
	{
		categoryGroup.GET("/", func(c *gin.Context) {
			utils.RenderTemplateAdmin(c, "Category/index", "Danh mục VuPhone")
		})
		categoryGroup.GET("/create", func(c *gin.Context) {
			utils.RenderTemplateAdmin(c, "Category/create", "Tạo danh mục VuPhone")
		})
		/*-------------------------------API----------------------------------------*/
		categoryGroup.POST("/createCategory", api.CreateCategories)
		categoryGroup.GET("/getParentCategory", api.GetCategories)
		categoryGroup.GET("/indexCategory", api.GetAllCategories)
		categoryGroup.PUT("/updateCategory/:id", api.UpdateCategory)
		categoryGroup.DELETE("/deleteCategory/:id", api.DeleteCategory)
		categoryGroup.GET("/searchCategory", api.SearchCategories)
	}
}
