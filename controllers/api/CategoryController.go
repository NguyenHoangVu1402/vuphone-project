package api

import (
	"math"
	"net/http"
	"strings"
	"vuphone-project/config"
	"vuphone-project/models"
	"strconv"
	"github.com/gin-gonic/gin"
)

// Hàm tạo danh mục
func CreateCategories(c *gin.Context) {
	var input struct {
		Name     string `json:"name" binding:"required"`
		Slug     string `json:"slug" binding:"required"`
		ParentID string `json:"parent_id"` // Nhận `parent_id` dưới dạng string
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Dữ liệu không hợp lệ", "error": err.Error()})
		return
	}

	// Chuyển đổi ParentID từ string sang uint
	var parentID *uint
	if input.ParentID != "" {
		id, err := strconv.ParseUint(input.ParentID, 10, 32)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "parent_id phải là số nguyên"})
			return
		}
		uintID := uint(id)
		parentID = &uintID
	}

	category := models.Category{
		Name:     input.Name,
		Slug:     input.Slug,
		ParentID: parentID,
	}

	if err := config.DB.Create(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi tạo danh mục"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Tạo danh mục thành công!"})
}

// Định dạng danh mục theo cây cha-con
func formatCategories(categories []models.Category, parentID *uint, level int) []map[string]interface{} {
	var formatted []map[string]interface{}

	for _, cat := range categories {
		if (cat.ParentID == nil && parentID == nil) || (cat.ParentID != nil && parentID != nil && *cat.ParentID == *parentID) {
			formatted = append(formatted, map[string]interface{}{
				"id":   cat.ID,
				"name": strings.Repeat("-", level*2) + " " + cat.Name, // Thêm dấu gạch thể hiện cấp bậc
				"slug": cat.Slug,
			})
			// Đệ quy lấy danh mục con
			formatted = append(formatted, formatCategories(categories, &cat.ID, level+1)...)
		}
	}

	return formatted
}

// Lấy tất cả danh mục cha - con theo cấp bậc
func GetCategories(c *gin.Context) {
	var categories []models.Category

	query := `SELECT id, name, slug, parent_id FROM categories`
	if err := config.DB.Raw(query).Scan(&categories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi lấy danh mục"})
		return
	}

	formattedCategories := formatCategories(categories, nil, 0) // Sử dụng hàm formatCategories
	c.JSON(http.StatusOK, formattedCategories)
}

func GetAllCategories(c *gin.Context) {
    var categories []models.Category
    var total int64

    // Lấy tham số từ query, mặc định page = 1, limit = 10
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

    // Tính toán OFFSET
    offset := (page - 1) * limit

    // Đếm tổng số danh mục (để tính tổng số trang)
    config.DB.Model(&models.Category{}).Count(&total)

    // Truy vấn danh mục có phân trang
    if err := config.DB.
        Select("id, name, slug, parent_id").
        Limit(limit).
        Offset(offset).
        Find(&categories).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // Trả về kết quả có phân trang
    c.JSON(http.StatusOK, gin.H{
        "categories": categories,
        "total":      total,
        "page":       page,
        "limit":      limit,
        "totalPages": int(math.Ceil(float64(total) / float64(limit))), // Tổng số trang
    })
}

func UpdateCategory(c *gin.Context) {
	var updatedCategory models.Category

	if err := c.ShouldBindJSON(&updatedCategory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Dữ liệu không hợp lệ", "error": err.Error()})
		return
	}

	// Kiểm tra xem ID có hợp lệ không
	if updatedCategory.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ID danh mục không hợp lệ"})
		return
	}

	// Tìm danh mục cần cập nhật
	var category models.Category
	if err := config.DB.First(&category, updatedCategory.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Danh mục không tồn tại"})
		return
	}

	// Chỉ cập nhật các trường name, slug, parent_id (không cập nhật ID)
	if err := config.DB.Model(&category).Updates(map[string]interface{}{
		"name":      updatedCategory.Name,
		"slug":      updatedCategory.Slug,
		"parent_id": updatedCategory.ParentID,
	}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi cập nhật danh mục"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Cập nhật danh mục thành công!"})
}

// Xóa danh mục
func DeleteCategory(c *gin.Context) {
	// Lấy ID từ URL param
	idParam := c.Param("id")
	categoryID, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ID danh mục không hợp lệ"})
		return
	}

	// Tìm danh mục cần xóa
	var category models.Category
	if err := config.DB.First(&category, categoryID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Danh mục không tồn tại"})
		return
	}

	// Xóa danh mục (nếu dùng soft delete, thay `.Delete()` bằng `.Unscoped().Delete()`)
	if err := config.DB.Delete(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi xóa danh mục"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Xóa danh mục thành công!"})
}

func SearchCategories(c *gin.Context) {
	// Lấy từ khóa tìm kiếm từ query
	keyword := c.Query("q")

	var categories []models.Category

	if keyword == "" {
		// Nếu không có `q`, trả về toàn bộ danh mục
		if err := config.DB.Limit(10).Find(&categories).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi lấy danh mục"})
			return
		}
	} else {
		// Nếu có từ khóa tìm kiếm, thực hiện truy vấn LIKE
		searchTerm := "%" + keyword + "%"
		if err := config.DB.Where("name LIKE ? OR slug LIKE ?", searchTerm, searchTerm).Limit(10).Find(&categories).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi tìm kiếm danh mục"})
			return
		}
	}

	// Trả về danh sách danh mục
	c.JSON(http.StatusOK, gin.H{"categories": categories})
}