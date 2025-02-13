package middleware

import (
	"github.com/casbin/casbin/v2"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Middleware kiểm tra quyền với Casbin
func CasbinMiddleware(e *casbin.Enforcer) gin.HandlerFunc {
	return func(c *gin.Context) {
		sub := c.GetString("user") // Lấy user từ request
		obj := c.Request.URL.Path  // Lấy đường dẫn request
		act := c.Request.Method    // Lấy phương thức (GET, POST,...)

		ok, _ := e.Enforce(sub, obj, act)
		if !ok {
			c.JSON(http.StatusForbidden, gin.H{"message": "Không có quyền truy cập"})
			c.Abort()
			return
		}

		c.Next()
	}
}