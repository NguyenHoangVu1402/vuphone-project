package models

import (
	"fmt"
	"gorm.io/gorm"
)

func MigrateDB(db *gorm.DB) error{
	err := db.AutoMigrate(
		&Role{},
		&Category{},
	)
	if err != nil {
		return fmt.Errorf("❌ Lỗi khi migrate DB: %w", err)
	}
	fmt.Println("✅ Database migrated successfully!")
	return nil
}