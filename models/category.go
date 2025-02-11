package models

import (
	"time"
	"gorm.io/gorm"
)

type Category struct {
    ID       uint   `json:"id"`
    Name     string `json:"name"`
    Slug     string `json:"slug"`
    ParentID *uint  `json:"parent_id"`
    Parent   *Category `json:"parent,omitempty" gorm:"foreignKey:ParentID"`

	// Thêm các trường ngày tháng
    CreatedAt time.Time      `json:"created_at"`
    UpdatedAt time.Time      `json:"updated_at"`
    DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

// Migration
func MigrateDB(db *gorm.DB) {
	db.AutoMigrate(&Category{})
}
