import verifyToken from "../helpers/verifyToken.js";
import User from "../models/user.model.js";
import response from "../helpers/response.js";
export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return response(res, 403, false, "Unauthorize can not find token")
        }
        const decode = await verifyToken(token)
        const user = await User.findById(decode.id)
        if (!user) {
            return response(res, 404, false, "user not found")
        }
        req.user = user
        next()
    } catch (error) {
        response(res, 500, false, "Internal server error")
        console.error(error)
    }
}
