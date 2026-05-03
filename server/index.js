import express from 'express';
const app = express();
import cors from 'cors';

import dotenv from 'dotenv';
import connectDB from './config/connectdb.js';
import authrouter from './Routes/auth.Route.js';



dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get("/", (req,res) => {
    res.json({message: "Hello World!"});
})

app.use('/auth/api', authrouter);



app.listen(process.env.PORT,() => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
    connectDB();
})


