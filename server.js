import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';
import morgan from "morgan";
import express from 'express';
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import authRouter from "./router/authRouter.js";


dotenv.config()

// env load
const PORT = process.env.PORT;

connectDB();

const app = express();

// middlewares

app.use(morgan('dev'));
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)



// server listening port

app.listen(process.env.PORT, () => {
    console.log("Server is running on port:", process.env.PORT)
})

