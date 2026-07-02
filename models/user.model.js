
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field not be empty"]
    },
    phone: {
        type: Number,
        required: [true, "Phone field not be empty"],
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email field not be empty"]
    },
    password: {
        type: String,
        required: [true, "Password field not be empty"]
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User;
