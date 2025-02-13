package api

import (
	"math"
	"net/http"
	"vuphone-project/config"
	"vuphone-project/models"
	"strconv"
	"github.com/gin-gonic/gin"
	"github.com/gofrs/uuid"
)

// Hàm tạo danh mục
func CreateRoles(c *gin.Context) {
	var input struct {
		Name     string `json:"name" binding:"required"`
		Slug     string `json:"slug" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Dữ liệu không hợp lệ", "error": err.Error()})
		return
	}

	// Tạo UUID mới cho Role
	newID, err := uuid.NewV4()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi tạo UUID"})
		return
	}

	role := models.Role{
		ID:       newID,
		Name:     input.Name,
		Slug:     input.Slug,
	}

	if err := config.DB.Create(&role).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi tạo role"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Tạo role thành công!", "data": role})
}


// Lấy tất cả role
func formatRoles(roles []models.Role) []map[string]interface{} {
	var formatted []map[string]interface{}

	for _, cat := range roles {
		
			formatted = append(formatted, map[string]interface{}{
				"id":   cat.ID.String(), // Chuyển UUID thành string
				"name":  cat.Name, 
				"slug": cat.Slug,
			})
	}

	return formatted
}

// Lấy tất cả danh mục cha - con theo cấp bậc
func GetRoles(c *gin.Context) {
	var roles []models.Role

	query := `SELECT id, name, slug FROM roles`
	if err := config.DB.Raw(query).Scan(&roles).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi lấy danh mục"})
		return
	}

	formattedRoles := formatRoles(roles) 
	c.JSON(http.StatusOK, formattedRoles)
}


func GetAllRoles(c *gin.Context) {
    var roles []models.Role
    var total int64

    // Lấy tham số từ query, mặc định page = 1, limit = 10
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

    // Tính toán OFFSET
    offset := (page - 1) * limit

    // Đếm tổng số danh mục (để tính tổng số trang)
    config.DB.Model(&models.Role{}).Count(&total)

    // Truy vấn danh mục có phân trang
    if err := config.DB.
        Select("id, name, slug").
        Limit(limit).
        Offset(offset).
        Find(&roles).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // Trả về kết quả có phân trang
    c.JSON(http.StatusOK, gin.H{
        "roles": 	roles,
        "total":      total,
        "page":       page,
        "limit":      limit,
        "totalPages": int(math.Ceil(float64(total) / float64(limit))), // Tổng số trang
    })
}

func UpdateRoles(c *gin.Context) {
	// Lấy ID từ URL thay vì JSON
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Thiếu ID trong URL"})
		return
	}

	// Chuyển đổi ID từ string sang uuid.UUID
	roleID, err := uuid.FromString(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ID role không hợp lệ"})
		return
	}

	// Định nghĩa struct đầu vào (không cần ID)
	var input struct {
		Name     string  `json:"name" binding:"required"`
		Slug     string  `json:"slug" binding:"required"`
	}

	// Kiểm tra dữ liệu đầu vào
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Dữ liệu không hợp lệ", "error": err.Error()})
		return
	}

	

	// Tìm danh mục
	var role models.Role
	if err := config.DB.First(&role, "id = ?", roleID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Danh mục không tồn tại"})
		return
	}

	// Cập nhật dữ liệu
	if err := config.DB.Model(&role).Updates(map[string]interface{}{
		"name":      input.Name,
		"slug":      input.Slug,
	}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi cập nhật role"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Cập nhật role thành công!"})
}


// Xóa danh mục
func DeleteRoles(c *gin.Context) {
	// Lấy ID từ URL
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Thiếu ID trong URL"})
		return
	}

	// Chuyển ID từ string sang UUID
	roleID, err := uuid.FromString(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ID danh mục không hợp lệ"})
		return
	}

	// Tìm danh mục
	var role models.Role
	if err := config.DB.First(&role, "id = ?", roleID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Role không tồn tại"})
		return
	}

	// Xóa danh mục (có thể dùng soft delete)
	if err := config.DB.Delete(&role).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi xóa role"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Xóa role thành công!"})
}


func SearchRoles(c *gin.Context) {
	// Lấy từ khóa tìm kiếm từ query
	keyword := c.Query("q")

	var role []models.Role

	if keyword == "" {
		// Nếu không có `q`, trả về toàn bộ danh mục
		if err := config.DB.Limit(10).Find(&role).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi lấy role"})
			return
		}
	} else {
		// Nếu có từ khóa tìm kiếm, thực hiện truy vấn LIKE
		searchTerm := "%" + keyword + "%"
		if err := config.DB.Where("name LIKE ? OR slug LIKE ?", searchTerm, searchTerm).Limit(10).Find(&role).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Lỗi khi tìm kiếm role"})
			return
		}
	}

	// Trả về danh sách danh mục
	c.JSON(http.StatusOK, gin.H{"role": role})
}