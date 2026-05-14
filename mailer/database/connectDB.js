import mongoose from "mongoose";
import 'dotenv/config';

const url = process.env.MONGOURL || "mongodb://127.0.0.1:27017/mailer";

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected Successfully!');
    } catch (err) {
        console.log('Error connecting MongoDB:', err);
    }
}

export default connectDB;