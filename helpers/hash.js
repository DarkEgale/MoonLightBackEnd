import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
    try {
        if (!password) {
            throw new Error("Please Provide password")
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash;
    } catch (error) {
        throw new Error(`Error hashing password: ${error.message}`);
    }
}

export default hashPassword;