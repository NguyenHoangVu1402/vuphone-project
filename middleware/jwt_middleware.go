package middleware

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
    "strings"
    "fmt"
    "github.com/joho/godotenv"
    "gorm.io/gorm"
    "github.com/gofrs/uuid"
    "log"
    "vuphone-project/models"
    "vuphone-project/config"
    "os"
    "time"
)

// LoadEnv function để load file .env
func LoadEnv() []byte {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Lỗi khi load file .env")
    }

    secret := os.Getenv("JWT_SECRET")
    if secret == "" {
        log.Fatal("JWT_SECRET không được tìm thấy trong .env")
    }

    return []byte(secret)
}

var secretKey = LoadEnv()

func CreateAccessToken(userID uuid.UUID, db *gorm.DB) (string, error) {
    // Tạo claims cho JWT
    claims := jwt.MapClaims{
        "user_id": userID.String(),
        "exp":     time.Now().Add(time.Minute * 15).Unix(), // Hết hạn sau 15 phút
    }

    // Tạo token với secret key
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(secretKey)
    if err != nil {
        return "", err
    }

    return tokenString, nil
}

func CreateRefreshToken(userID uuid.UUID, db *gorm.DB) (string, error) {
    // Tạo claims cho refresh token
    claims := jwt.MapClaims{
        "user_id": userID.String(),
        "exp":     time.Now().Add(time.Hour * 24 * 7).Unix(), // Hết hạn sau 7 ngày
    }

    // Tạo token với secret key
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(secretKey)
    if err != nil {
        return "", err
    }

    return tokenString, nil
}

func ValidateAccessToken(accessToken string, db *gorm.DB) (*models.AccessToken, error) {
    // Parse và xác thực token
    token, err := jwt.Parse(accessToken, func(token *jwt.Token) (interface{}, error) {
        return secretKey, nil
    })
    if err != nil || !token.Valid {
        return nil, fmt.Errorf("access token không hợp lệ: %v", err)
    }

    // Lấy claims
    claims, ok := token.Claims.(jwt.MapClaims)
    if !ok {
        return nil, fmt.Errorf("không thể đọc claims từ token")
    }

    userID, ok := claims["user_id"].(string)
    if !ok {
        return nil, fmt.Errorf("user_id không hợp lệ")
    }

    // Chuyển user_id từ chuỗi thành uuid.UUID
    userUUID, err := uuid.FromString(userID)
    if err != nil {
        return nil, fmt.Errorf("user_id không hợp lệ: %v", err)
    }

    // Kiểm tra user trong DB (tùy chọn)
    var user models.User
    if err := db.Where("id = ?", userUUID).First(&user).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            return nil, fmt.Errorf("người dùng không tồn tại")
        }
        return nil, err
    }

    // Tạo một struct tạm để trả về
    return &models.AccessToken{
        UserID:    userUUID,
        ExpiresAt: time.Unix(int64(claims["exp"].(float64)), 0),
    }, nil
}

func RefreshAccessToken(c *gin.Context) {
    var input struct {
        RefreshToken string `json:"refresh_token" binding:"required"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Dữ liệu không hợp lệ"})
        return
    }

    newAccessToken, err := refreshAccessToken(input.RefreshToken, config.DB) // Truyền db vào
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"access_token": newAccessToken})
}

func refreshAccessToken(refreshToken string, db *gorm.DB) (string, error) {
    // Xác thực refresh token
    token, err := jwt.Parse(refreshToken, func(token *jwt.Token) (interface{}, error) {
        return secretKey, nil
    })
    if err != nil || !token.Valid {
        return "", fmt.Errorf("refresh token không hợp lệ: %v", err)
    }

    claims, ok := token.Claims.(jwt.MapClaims)
    if !ok {
        return "", fmt.Errorf("không thể đọc claims từ refresh token")
    }

    userID, ok := claims["user_id"].(string)
    if !ok {
        return "", fmt.Errorf("user_id không hợp lệ")
    }

    // Chuyển user_id từ chuỗi thành uuid.UUID
    userUUID, err := uuid.FromString(userID)
    if err != nil {
        return "", fmt.Errorf("user_id không hợp lệ: %v", err)
    }

    // Tạo access token mới
    newAccessToken, err := CreateAccessToken(userUUID, db)
    if err != nil {
        return "", fmt.Errorf("không thể tạo Access Token mới: %v", err)
    }

    return newAccessToken, nil
}

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

        // Lấy claims và kiểm tra user_id
        claims, ok := token.Claims.(jwt.MapClaims)
        if !ok || !token.Valid {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Token không hợp lệ"})
            c.Abort()
            return
        }

        userIDStr, ok := claims["user_id"].(string)
        if !ok {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "user_id không hợp lệ"})
            c.Abort()
            return
        }

        userID, err := uuid.FromString(userIDStr)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": fmt.Sprintf("user_id không hợp lệ: %v", err)})
            c.Abort()
            return
        }

        c.Set("userID", userID)
        c.Next()
    }
}