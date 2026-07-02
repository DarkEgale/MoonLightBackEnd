import mongoose from "mongoose";
import dotenv from "dotenv";

// env configuration 

dotenv.config();

// load database url

const dbUrl = process.env.MONGODB

// connect with database

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl)
        console.log("Server is connected with Database")
    } catch (error) {
        console.error("Connection failed with Database")
    }
}
//export function 
export default connectDB;