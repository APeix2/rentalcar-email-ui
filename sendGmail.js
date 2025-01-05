const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// 讀取 EDM HTML 檔案
const emailTemplatePath = path.join(__dirname,"app","success-ch", "success-ch.html");
const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
// 設定 SMTP 伺服器
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail SMTP 伺服器 (或 Mailtrap, SendGrid, 自建 SMTP)
    port: 587, // 587: TLS, 465: SSL
    secure: false, // true for 465, false for other ports
    auth: {
        user: "enpeilo.chailease@gmail.com", // 你的 Email
        pass: "csam peuf ffvr ukur", // Gmail 需要使用 "應用程式密碼" (App Password)
    },
});

// 設定 Email 內容
const mailOptions = {
    from: '"測試edm" <enpeilo.chailease@gmail.com>', // 寄件者名稱與 Email
    to: "EnPeiLo@chailease.com.tw", // 收件者 Email
    subject: "訂單詳細資訊", // 郵件標題
    html: emailTemplate, // EDM HTML 內容
};

// 發送 Email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log("❌ 發送失敗:", error);
    }
    console.log("✅ Email 已發送:", info.response);
});
