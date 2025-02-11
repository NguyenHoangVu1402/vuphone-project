package config

import (
	"fmt"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := "root:Hoangvu1402001@tcp(localhost:3306)/vuphone?charset=utf8mb4&parseTime=True&loc=Local"

	// Kết nối GORM với MySQL
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Lỗi kết nối MySQL:", err)
	}

	DB = db
	fmt.Println("✅ Kết nối MySQL thành công!")
}
