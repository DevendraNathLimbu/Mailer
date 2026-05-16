import express from 'express';
import 'dotenv/config';
import connectDB from './database/connectDB.js'
import userRoute from './route/user.route.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute);

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})