import User from "../models/user.model.js";


export const adminVerify = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" })
        }

        req.user = user
        next()

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
