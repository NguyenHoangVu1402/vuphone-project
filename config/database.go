package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("❌ Lỗi load file .env:", err)
	}
}

func ConnectDB() {
	// Lấy thông tin DB từ biến môi trường
	dsn := os.Getenv("DB_DSN") 

	if dsn == "" {
		log.Fatal("❌ DB_DSN chưa được cấu hình trong biến môi trường")
	}

	// Kết nối GORM với MySQL
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent), // Giảm log khi chạy production
	})
	if err != nil {
		log.Fatal("❌ Lỗi kết nối MySQL:", err)
	}

	// Lấy instance SQL DB để cấu hình connection pool
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("❌ Lỗi lấy database instance:", err)
	}

	// Cấu hình kết nối tối ưu
	sqlDB.SetMaxOpenConns(50) // Số kết nối tối đa
	sqlDB.SetMaxIdleConns(10) // Số kết nối rảnh tối đa
	sqlDB.SetConnMaxLifetime(60) // Thời gian sống của 1 connection (giây)

	DB = db
	fmt.Println("✅ Kết nối MySQL thành công!")
}
