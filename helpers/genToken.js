import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const genToken = async (id) => {
    try {
        if (!id) {
            throw new Error("Please provide Id")

        }
        const token = jwt.sign({ id: id }, process.env.SECRET_KEY, { expiresIn: "7d" })
        return token;
    } catch (error) {
        console.error("Token generation failed", error)
        return null;
    }
}
export default genToken;
