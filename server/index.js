import express from 'express';
const app = express();
import cors from 'cors';

import dotenv from 'dotenv';
import connectDB from './config/connectdb.js';
import authrouter from './Routes/auth.Route.js';
import UserRouter from './Routes/user.Routes.js';
import cookieParser from 'cookie-parser';
import interviewRouter from './Routes/interview.Routes.js';
import PaymentRouter from './Routes/payment.Routes.js';



dotenv.config();

app.use(cors({
    origin: "https://interviewplatform-1.onrender.com",
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));



app.get("/", (req,res) => {
    res.json({message: "Hello World!"});
})

app.use('/api/auth', authrouter);
app.use('/api/user', UserRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", PaymentRouter);


app.listen(process.env.PORT,() => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
    connectDB();
})


