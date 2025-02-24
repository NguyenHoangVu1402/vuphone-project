package models

import (
	"time"
	


	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID         uuid.UUID      `json:"id" gorm:"type:char(36);primaryKey"`
	Name       string         `json:"name" binding:"required"`
	Gender     string         `json:"gender" binding:"required,oneof=Nam,Nữ"`
	BirthDate  time.Time      `json:"birth_date" binding:"required"`
	Email      string         `json:"email" gorm:"size:255;unique;not null" binding:"required,email"`
	Phone      string         `json:"phone" gorm:"size:20;unique" binding:"required"`
	Username   string         `json:"username" gorm:"size:100;unique;not null" binding:"required"`
	Password   string         `json:"password" gorm:"size:255;not null" binding:"required,min=8"`
	Points     int            `json:"points" gorm:"default:0"`
	Avatar     string         `json:"avatar"`
	RoleID     uuid.UUID      `json:"role_id" gorm:"type:char(36);not null"`
	IsVerified bool           `json:"is_verified" gorm:"default:false"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `json:"deleted_at" gorm:"index"`
	OTPs       []OTP          `json:"otps" gorm:"foreignKey:UserID"`
}



// Tạo UUID và mã hóa mật khẩu trước khi lưu vào DB
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	// Tạo UUID nếu chưa có
	if u.ID == uuid.Nil {
		u.ID, err = uuid.NewV4()
		if err != nil {
			return err
		}
	}
return nil
	
}


