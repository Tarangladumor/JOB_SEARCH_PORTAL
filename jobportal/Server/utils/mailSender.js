const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let info = await transporter.sendMail({
            from: 'Kaam Dhando || By Tarang',
            to: email,
            subject: title,
            html: body
        });

        console.log("Email sent:", info);

        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Re-throw the error to propagate it to the caller
    }
};

module.exports = mailSender;
