package models

import (
	"time"
	
	"github.com/gofrs/uuid"
)

type OTP struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uuid.UUID `gorm:"type:char(36);not null"`
	Code      string    `gorm:"size:6;not null"`
	ExpiresAt time.Time `gorm:"not null"`
	CreatedAt time.Time
}