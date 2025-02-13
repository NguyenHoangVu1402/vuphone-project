package models

import (
	"time"
    "github.com/gofrs/uuid"
	"gorm.io/gorm"
)


type Role struct {
	ID       uuid.UUID `json:"id" gorm:"type:char(36);primaryKey"` // UUID thay cho uint
	Name     string    `json:"name"`
	Slug     string    `json:"slug"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

func (c *Role) BeforeCreate(tx *gorm.DB) (err error) {
    if c.ID == uuid.Nil {
        c.ID, err = uuid.NewV4()
        if err != nil {
            return err
        }
    }
    return nil
}

