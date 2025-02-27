package main


import (
	"log"
	"vuphone-project/config"
	"vuphone-project/models"
	"vuphone-project/routes/user"
	"vuphone-project/routes/admin"
	"vuphone-project/routes/auth"
	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDB()
	r := gin.Default()
	r.Static("/static", "./static")
	// Connect to database
	config.ConnectDB()

	// Migrate the schema
	// Chạy migration
	if err := models.MigrateDB(config.DB); err != nil {
		log.Fatal(err)
	}

	// Routes
	/* User */
	user.HomeRoutes(r)
	/* Admin */
	admin.DashboardRoutes(r)
	admin.CategoryRoutes(r)
	admin.RoleRoutes(r)

	/* Auth */
	auth.AuthRoutes(r)

	//Pusher
	r.GET("/send", config.SendEvent)
	
	// Run the server
	err := r.Run(":8080")
	if err != nil {
		log.Fatal("Lỗi chạy Server: ", err)
	}
}