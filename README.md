# 📧 Mailer - Reusable Authentication System

Mailer is a **plug-and-play authentication module** built with Node.js and Express. It provides a complete user authentication flow with email integration, making it easy to integrate into any project without rebuilding auth from scratch.

This system handles everything from **user registration to secure login, email verification, OTP-based password reset, and password updates** — all ready to use out of the box.

---

## 🚀 Features

- 🧑‍💻 User Registration
- 📩 Email Verification on Signup
- 🔐 Secure Login & Logout
- 🔁 OTP-based Password Reset via Email
- 🔑 Change Password functionality
- 📬 Automated Email Sending (Registration + OTP)
- 🧩 Fully reusable authentication module

---

## 🧠 Why Use Mailer?

Instead of building authentication repeatedly for every project, simply plug in this module and save hours of development time.

✔ Ready-to-use authentication flow  
✔ Secure JWT-based system  
✔ Email integration included  
✔ Easy environment configuration  
✔ Clean and modular structure  

---

## 🔐 Add .env file
```bash
PORT=5000
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
APP_USER=your_email@gmail.com
APP_PASS=your_email_app_password
```

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/DevendraNathLimbu/Mailer
cd mailer
npm run dev
