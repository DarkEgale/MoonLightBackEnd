import dotenv from 'dotenv';
import jwt from "jsonwebtoken";


dotenv.config();

const verifyToken = async (token) => {
    try {
        if (!token) {
            throw new Error("Please provide token");
        }
        const verify = await jwt.verify(token, process.env.SECRET_KEY)
        return verify;
    } catch (error) {
        throw new Error(`Token verify failed: ${error.message}`);
    }
}

export default verifyToken;
