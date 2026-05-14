import express from 'express';
import { userRegister } from '../controller/user.controller.js'

const router = express.Router();

//Register User
router.post('/register', userRegister);

export default router;