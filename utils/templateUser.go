package utils

import (
	"github.com/gin-gonic/gin"
	"html/template"
	"log"
	"net/http"
)

// Render template cho trang user
func RenderTemplateUser(c *gin.Context, tmpl string, title string) {
	tmplPath := "templates/user/pages/" + tmpl + ".html"

	// Load cả template mẹ (index.html) và template con (tmplPath)
	templates, err := template.ParseFiles("templates/user/layout/index.html", tmplPath)
	if err != nil {
		log.Println("Lỗi render template:", err)
		c.String(http.StatusInternalServerError, "Lỗi server")
		return
	}

	// Thực thi template mẹ nhưng nội dung từ trang con
	data := map[string]string{
		"Title": title,
	}
	err = templates.ExecuteTemplate(c.Writer, "index.html", data)
	if err != nil {
		log.Println("Lỗi thực thi template:", err)
		c.String(http.StatusInternalServerError, "Lỗi server")
	}
}
