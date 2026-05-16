import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 6
    },
    token:{
        type: String,
        default: null
    },
    otp:{
        type: String,
        default: null
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isLoggedIn:{
        type: Boolean,
        default: false
    }
    ,
    OTP_expiry:{
        type: Date,
    },
    sessionExpiry:{
        type: Date
    }
},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;