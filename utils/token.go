package utils

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

// LoadEnv function để load file .env
func LoadEnv() []byte {
	// Load biến môi trường từ file .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Lỗi khi load file .env")
	}

	// Lấy giá trị JWT_SECRET từ biến môi trường
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Fatal("JWT_SECRET không được tìm thấy trong .env")
	}

	// Chuyển thành []byte và return
	return []byte(secret)
}

 // Chuyển thành []byte
 var secretKey = LoadEnv()

 // GenerateToken tạo JWT token
 func GenerateToken(username string) (string, error) {
	claims := jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(secretKey)
 }