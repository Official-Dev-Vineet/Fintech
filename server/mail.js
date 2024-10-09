const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
    logger: true,
});


async function sendEmail(to, from, subject, html) {
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}
module.exports = {sendEmail}