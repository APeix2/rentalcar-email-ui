const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// 讀取 EDM HTML 檔案
const emailTemplatePath = path.join(__dirname,"app","success-ch", "success-ch.html");
const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

async function sendEmail(accessToken) {
    const transporter = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
            type: "OAuth2",
            user: "labibi.lg@gmail.com",
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: "your-refresh-token",
            accessToken: accessToken, // 如果 refreshToken 可用，accessToken 可省略
        },
    });

    const mailOptions = {
        from: "labibi.lg@outlook.com",
        to: "labibi.lg@outlook.com",
        subject: "Office 365 OAuth2 測試郵件",
        html: emailTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ 發送失敗:", error);
        } else {
            console.log("✅ 郵件已成功發送:", info.response);
        }
    });
}

sendEmail("your-valid-access-token");