package models

import (
	"time"
    "github.com/gofrs/uuid"
	"gorm.io/gorm"
)


type Category struct {
	ID       uuid.UUID `json:"id" gorm:"type:char(36);primaryKey"` // UUID thay cho uint
	Name     string    `json:"name"`
	Slug     string    `json:"slug"`
	ParentID *uuid.UUID `json:"parent_id"`
	Parent   *Category `json:"parent,omitempty" gorm:"foreignKey:ParentID"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

func (c *Category) BeforeCreate(tx *gorm.DB) (err error) {
    if c.ID == uuid.Nil {
        c.ID, err = uuid.NewV4()
        if err != nil {
            return err
        }
    }
    return nil
}

