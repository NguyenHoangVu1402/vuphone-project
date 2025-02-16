package utils

import (
	"math/rand"
	"strconv"
	"time"
)

// Tạo ngẫu nhiên mã OTP 6 chữ số
var seededRand = rand.New(rand.NewSource(time.Now().UnixNano()))

func GenerateOTP() string {
	return strconv.Itoa(seededRand.Intn(900000) + 100000)
}
