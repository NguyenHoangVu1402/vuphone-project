package config

import (
	"github.com/gin-gonic/gin"
	"github.com/pusher/pusher-http-go/v5"
)

//Cấu hình Pusher
var PusherClient = pusher.Client{
	AppID:   "1890954",
	Key:     "3d8e823b96373ae07973",
	Secret:  "d6abb124e740ea456e44",
	Cluster: "ap1",
	Secure:  true,
}

//API gửi sự kiện đến Pusher
func SendEvent(c *gin.Context) {
	data := map[string]string{"message": "Xin chào từ Go!"}
	err := PusherClient.Trigger("my-channel", "my-event", data)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
	} else {
		c.JSON(200, gin.H{"message": "Sự kiện đã gửi thành công!"})
	}
}