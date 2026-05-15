import mongoose from "mongoose";

const sessionModel = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
})

export const Session = mongoose.model('Session', sessionModel);