package api

import (
	"math"
	"net/http"
	"strings"
	"vuphone-project/config"
	"vuphone-project/models"
	"strconv"
	"github.com/gin-gonic/gin"
	"github.com/gofrs/uuid"
)

// Hàm tạo danh mục
func CreateCategories(c *gin.Context) {
	var input struct {
		Name     string `json:"name" binding:"required"`
		Slug     string `json:"slug" binding:"required"`
		ParentID string `json:"parent_id"` // Nhận ParentID dưới dạng string
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Dữ liệu không hợp lệ", "error": err.Error()})
		return
	}

	// Chuyển đổi ParentID từ string sang UUID
	var parentID *uuid.UUID
	if input.ParentID != "" {
		parsedUUID, err := uuid.FromString(input.ParentID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "parent_id phải là UUID hợp lệ"})
			return
		}
		parentID = &parsedUUID
	}

	// Tạo UUID mới cho Category
	newID, err := uuid.NewV4()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi tạo UUID"})
		return
	}

	category := models.Category{
		ID:       newID,
		Name:     input.Name,
		Slug:     input.Slug,
		ParentID: parentID,
	}

	if err := config.DB.Create(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi tạo danh mục"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Tạo danh mục thành công!", "data": category})
}

// Định dạng danh mục theo cây cha-con
func formatCategories(categories []models.Category, parentID *uuid.UUID, level int) []map[string]interface{} {
	var formatted []map[string]interface{}

	for _, cat := range categories {
		if (cat.ParentID == nil && parentID == nil) || (cat.ParentID != nil && parentID != nil && *cat.ParentID == *parentID) {
			formatted = append(formatted, map[string]interface{}{
				"id":   cat.ID.String(), // Chuyển UUID thành string
				"name": strings.Repeat("-", level*2) + " " + cat.Name, // Hiển thị cấp bậc bằng dấu "-"
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
	// Lấy ID từ URL thay vì JSON
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Thiếu ID trong URL"})
		return
	}

	// Chuyển đổi ID từ string sang uuid.UUID
	categoryID, err := uuid.FromString(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ID danh mục không hợp lệ"})
		return
	}

	// Định nghĩa struct đầu vào (không cần ID)
	var input struct {
		Name     string  `json:"name" binding:"required"`
		Slug     string  `json:"slug" binding:"required"`
		ParentID *string `json:"parent_id"`
	}

	// Kiểm tra dữ liệu đầu vào
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Dữ liệu không hợp lệ", "error": err.Error()})
		return
	}

	// Chuyển đổi ParentID nếu có
	var parentID *uuid.UUID
	if input.ParentID != nil {
		parsedParentID, err := uuid.FromString(*input.ParentID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "parent_id không hợp lệ"})
			return
		}
		parentID = &parsedParentID
	}

	// Tìm danh mục
	var category models.Category
	if err := config.DB.First(&category, "id = ?", categoryID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Danh mục không tồn tại"})
		return
	}

	// Cập nhật dữ liệu
	if err := config.DB.Model(&category).Updates(map[string]interface{}{
		"name":      input.Name,
		"slug":      input.Slug,
		"parent_id": parentID,
	}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi cập nhật danh mục"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Cập nhật danh mục thành công!"})
}


// Xóa danh mục
func DeleteCategory(c *gin.Context) {
	// Lấy ID từ URL
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Thiếu ID trong URL"})
		return
	}

	// Chuyển ID từ string sang UUID
	categoryID, err := uuid.FromString(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ID danh mục không hợp lệ"})
		return
	}

	// Tìm danh mục
	var category models.Category
	if err := config.DB.First(&category, "id = ?", categoryID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Danh mục không tồn tại"})
		return
	}

	// Xóa danh mục (có thể dùng soft delete)
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