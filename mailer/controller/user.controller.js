import User from "../model/user.model.js";
import bcrypt from 'bcrypt';
import verifyMail from '../handleMail/verifyMail.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Session } from "../model/session.model.js";

//register user
export const userRegister = async (req, res) => {
    try{
        const {username, email, password} = req.body;

    const exists = await User.findOne({email});

    if(exists){
        return res.status(500).send({
            msg: "User already registered!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })

    const token = jwt.sign({
        id: newUser._id,
        username,
        email
    }, process.env.SECRET_KEY, {expiresIn: '1h'});
    verifyMail(token, email);

    newUser.token = token;

    await newUser.save();

    res.status(201).send({
        message: "User registered successfully"
    })
    
}catch(err){
    return res.status(500).send({
        msg: "Failed to register user",
        err
    })
}

}

//user verification
export const verification = async (req, res) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).send({
                message: "Authorization token is missing or invalid"
            })
        }

        const token = authHeader.split(" ")[1];

        let decoder;

        try{
        decoder = jwt.verify(token, process.env.SECRET_KEY);
        }catch(err){
        if(err.name == "TokenExpiryError"){
            return res.status(401).send({
                message: "Invalid token or token expired!"
            })
        }
        return res.status(401).send({
            message: "Error verifying user! token error"
        })
        }

        const user = await User.findById(decoder.id);

        if(!user){
            return res.status(404).send({
                message: "User not found"
            })
        }

        user.isVerified = true;
        user.token = null;

        await user.save();

        return res.status(200).send({
            message: "Email verified Successfully"
        })

    }
    catch(err){
        return res.status(401).send({
            message: "Error verifying user!"
        })
    }
}

//user login
export const userLogin = async (req, res) => {
    try{
        const {email, password} = req.body;

    const exists = await User.findOne({email});

    if(!exists){
        return res.status(404).send({
            message: "User not found! Please register before login"
        })
    }

    const comparePassword = await bcrypt.compare(password, exists.password);

    if(!comparePassword) {
        return res.status(401).send({
            message: "Incorrect password"
        })
    }

    const token = jwt.sign({
        userID: exists._id,
        username: exists.username,
        email: exists.email
    }, process.env.SECRET_KEY, {expiresIn: '1d'})

    req.user = {
        userID: exists._id,
        username: exists.username,
        email: exists.email
    };

    req.token = token;
    
    if(exists.isVerified == false) {
         return res.status(403).send({
            message: "User is not verified"
         })
    }

    exists.isLoggedIn = true;
    exists.token = null;
    await exists.save();

    //session for user
    const existingSession = await Session.findOne({userId: exists._id});
    if(existingSession){
        await Session.deleteOne({userId: exists._id});
    }

    await Session.create({
        userId: user._id
    })

    return res.status(200).send({
        message: "User successfully logged In"
    })
    }
    catch(err){
        return res.status(400).send({
            message: "Error Occured while logging In",
            err
        })
    }
}

//user logout
export const userLogOut = async (req, res) => {
    try{
        const userId = req.userId;
        await Session.deleteMany({userId});
        await User.findByIdAndUpdate(userId,{isLoggedIn: false});

        return res.status(200).json({
            message: "User successfully Logged Out!"
        })
    }catch(err){
        return res.status(500).json({
            message: "Failed to LogOut User"
        })
    }
}

//forgot/reset password
export const renewPass = async (req, res) => {
    const {email} = req.body;

    const exists = await User.findOne({email});

    if(!exists){
        return res.status(404).send({
            message: "Invalid email, User do not exist!"
        })
    }

    
}