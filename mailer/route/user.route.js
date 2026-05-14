import express from 'express';
import { userRegister, userLogin } from '../controller/user.controller.js'

const router = express.Router();

//Register User
router.post('/register', userRegister);

//Login User
router.post('/login', userLogin);

export default router;