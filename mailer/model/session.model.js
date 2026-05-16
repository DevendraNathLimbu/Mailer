import mongoose from "mongoose";
import User from "./user.model.js"

const sessionModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
})

const Session = mongoose.model('Session', sessionModel);

export default Session;