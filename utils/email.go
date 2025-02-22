package utils

import(
	"fmt"
	"net/smtp"
)

//Cấu hình smtp
const (
	SMTPServer = "smtp.gmail.com"
	SMTPPort = "587"
	SMTPUser = "nguyenhoangvu140201@gmail.com"
	SMTPPassword = "cvok ahrt ljfm flsw"
)

// sendMail gửi email với nội dung HTML
func sendMail(to, subject, body string) error {
	//Cấu trúc email
	from := SMTPUser
	msg := "From: " + from + "\n" +
	"To: " + to + "\n" +
	"Subject: " + subject + "\n" +
	"MIME-Version: 1.0\n" +
	"Content-Type: text/html; charset=UTF-8\n" +
	body

	//Kết nối SMTP
	auth := smtp.PlainAuth("", SMTPUser, SMTPPassword, SMTPServer)
	err := smtp.SendMail(SMTPServer+":"+SMTPPort, auth, from, []string{to}, []byte(msg))
	if err != nil {
		fmt.Println("Lỗi gửi email: ", err)
		return err
	}

	fmt.Println("Email đã được gửi thành công đến:", to)
	return nil
}

//SendEmail gửi email OTP
func SendEmail(toEmail, subject, otp string) error{
	body := fmt.Sprintf(`
	<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mã OTP Xác Thực</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 500px;
            margin: 50px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h2 {
            color: #333;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #e74c3c;
            background: #f8d7da;
            padding: 10px;
            border-radius: 5px;
            display: inline-block;
            letter-spacing: 2px;
            margin: 10px 0;
        }
        .footer {
            font-size: 14px;
            color: #777;
            margin-top: 20px;
        }
        .footer a {
            color: #3498db;
            text-decoration: none;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>Mã OTP Xác Thực</h2>
        <p>Chào bạn,</p>
        <p>Mã OTP của bạn để xác thực đăng nhập là:</p>
        <div class="otp-code">%s</div>
        <p>Mã này có hiệu lực trong <strong>5 phút</strong>. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
        <p class="footer">Trân trọng,<br><strong>Đội ngũ Vuphone</strong></p>
    </div>

</body>
</html>
	`, otp)

	return sendMail(toEmail, subject, body)
}

// SendWelcomeEmail gửi email chúc mừng khi OTP hợp lệ
func SendWelcomeEmail(toEmail, userName string) error {
	subject := "Chúc mừng bạn đã đăng nhập thành công!"
	body := fmt.Sprintf(`
	<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác nhận kích hoạt tài khoản</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 500px;
            margin: 50px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h2 {
            color: #2c3e50;
        }
        p {
            color: #333;
            font-size: 16px;
        }
        .success {
            font-size: 18px;
            font-weight: bold;
            color: #27ae60;
            margin: 15px 0;
        }
        .button {
            display: inline-block;
            background-color: #3498db;
            color: #ffffff;
            padding: 12px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            font-size: 14px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>Xin chào %s,</h2>
        <p class="success">🎉 Tài khoản của bạn đã được kích hoạt thành công!</p>
        <p>Chúng tôi chúc bạn có trải nghiệm tốt nhất trên hệ thống của chúng tôi.</p>
        
        <p class="footer">Trân trọng,<br><strong>Đội ngũ Vuphone</strong></p>
    </div>

</body>
</html>

	`, userName)
	return sendMail(toEmail, subject, body)
}