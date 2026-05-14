import express from 'express';
import { userRegister, verification ,userLogin } from '../controller/user.controller.js'

const router = express.Router();

//Register User
router.post('/register', userRegister);

//Email Verification
router.post('/verify', verification);

//Login User
router.post('/login', userLogin);

export default router;