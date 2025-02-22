package models

import (
	"time"
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
	
)

type RefreshToken struct {
	ID           uuid.UUID      `json:"id" gorm:"type:char(36);primaryKey"`
	UserID       uuid.UUID      `json:"user_id" gorm:"type:char(36);not null"`
	RefreshToken string         `json:"refresh_token" gorm:"not null"`
	ExpiresAt    time.Time      `json:"expires_at" gorm:"not null"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

// BeforeCreate là hook GORM để tạo UUID trước khi lưu vào DB
func (r *RefreshToken) BeforeCreate(tx *gorm.DB) (err error) {
	if r.ID == uuid.Nil {
		// Lấy cả 2 giá trị (uuid, err) và xử lý lỗi
		r.ID, err = uuid.NewV4() 
		if err != nil {
			return err // Nếu có lỗi thì trả về lỗi
		}
	}
	return nil
}

