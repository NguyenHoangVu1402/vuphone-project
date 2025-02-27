package utils

import (
	"github.com/gin-gonic/gin"
	"html/template"
	"log"
	"net/http"
)

// Render template cho trang auth
func RenderTemplateAuth(c *gin.Context, tmpl string, title string) {
	tmplPath := "templates/user/auth/" + tmpl + ".html"

	// Load cả template mẹ (index.html) và template con (tmplPath)
	templates, err := template.ParseFiles("templates/user/layout/auth.html", tmplPath)
	if err != nil {
		log.Println("Lỗi render template:", err)
		c.String(http.StatusInternalServerError, "Lỗi server")
		return
	}

	// Thực thi template mẹ nhưng nội dung từ trang con
	data := map[string]string{
		"Title": title,
	}
	err = templates.ExecuteTemplate(c.Writer, "auth.html", data)
	if err != nil {
		log.Println("Lỗi thực thi template:", err)
		c.String(http.StatusInternalServerError, "Lỗi server")
	}
}
