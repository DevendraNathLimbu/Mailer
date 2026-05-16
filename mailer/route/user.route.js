import express from 'express';
import { userRegister, verification ,userLogin, forgetPassword, verifyOTP, changePassword } from '../controller/user.controller.js'

const router = express.Router();

//Register User
router.post('/register', userRegister);

//Email Verification
router.post('/verify', verification);

//Login User
router.post('/login', userLogin);

//Send OTP - forget password
router.post('/forget-password', forgetPassword);

//Verify OTP
router.post('/verify-otp/:email', verifyOTP);

//Change password
router.post('/change-password/:email', changePassword);

export default router;