package middleware

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
    "strings"
    "fmt"
    "github.com/joho/godotenv"
    "log"
    "os"
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

// JWTMiddleware xác thực token JWT
func JWTMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Token không được cung cấp"})
            c.Abort()
            return
        }

        tokenString := strings.TrimPrefix(authHeader, "Bearer ")
        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, fmt.Errorf("method ký không hợp lệ: %v", token.Header["alg"])
            }
            return secretKey, nil
        })
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": fmt.Sprintf("Lỗi khi parse token: %v", err)})
            c.Abort()
            return
        }
        if !token.Valid {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Token không hợp lệ"})
            c.Abort()
            return
        }

        // Lưu thông tin người dùng trong context
        claims, ok := token.Claims.(jwt.MapClaims)
        if !ok || !token.Valid {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Token không hợp lệ"})
            c.Abort()
            return
        }

        c.Set("userID", claims["user_id"])
        c.Next()
    }
}
