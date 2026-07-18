import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';
import morgan from "morgan";
import express from 'express';
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import authRouter from "./router/authRouter.js";
import adminRouter from "./router/adminRoute.js";
import shopRouter from "./router/shopRoute.js";


dotenv.config()

// env load
const PORT = process.env.PORT;

connectDB();

const app = express();

// middlewares

app.use(morgan('dev'));
app.use(cors({
    origin: "moon-light-front-end.vercel.app",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/shop', shopRouter)



// server listening port

app.listen(process.env.PORT, () => {
    console.log("Server is running on port:", process.env.PORT)
})

