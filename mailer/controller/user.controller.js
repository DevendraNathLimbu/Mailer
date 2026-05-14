import User from "../model/user.model.js";
import bcrypt from 'bcrypt';
import verifyMail from '../handleMail/verifyMail.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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