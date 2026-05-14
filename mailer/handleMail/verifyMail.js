import nodemailer from 'nodemailer';
import 'dotenv/config'

const verifyMail = async (token, email) => {
    const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

const mailOptions = {
    from: process.env.APP_USER,
    to: email,
    subject: "Test Mail",
    text: `Hello Mr/Mrs, Thanks for verifying your email.`
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Email sent:", info.response);
    }
});
}

export default verifyMail;