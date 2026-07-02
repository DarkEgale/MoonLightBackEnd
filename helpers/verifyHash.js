import bcrypt from "bcryptjs";



const verifyHash = async (frontPass, dbpass) => {
    try {
        if (!frontPass || !dbpass) {
            throw new Error("Please provide password")
        }
        const verify = await bcrypt.compare(frontPass, dbpass)
        return verify
    } catch (error) {
        throw new Error(`Error verify password: ${error.message}`);
    }
}

export default verifyHash;