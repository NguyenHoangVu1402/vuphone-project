package utils

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gofrs/uuid"
	"github.com/joho/godotenv"
	
)

// Load .env và lấy secret key
var jwtSecret []byte

func init() {
	// Load biến môi trường từ file .env
	if err := godotenv.Load(); err != nil {
		fmt.Println("⚠️  Không tìm thấy file .env, dùng biến môi trường hệ thống")
	}

	// Lấy JWT_SECRET từ biến môi trường
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		fmt.Println("❌ LỖI: JWT_SECRET chưa được cấu hình trong .env!")
		os.Exit(1) // Thoát chương trình nếu thiếu JWT_SECRET
	}

	jwtSecret = []byte(secret)
}

// Struct chứa dữ liệu trong token
type Claims struct {
	UserID uuid.UUID `json:"user_id"`
	RoleID uuid.UUID `json:"role_id"`
	jwt.RegisteredClaims
}

// Tạo JWT token cho user
func GenerateJWT(userID, roleID uuid.UUID) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour) // Token hết hạn sau 1 ngày
	claims := &Claims{
		UserID: userID,
		RoleID: roleID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

// Xác thực JWT token
func ValidateJWT(tokenString string) (*Claims, error) {
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	return claims, nil
}