import User from "../models/user.model.js";
import response from "../helpers/response.js";

export const shopAccess = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate("shop");
        console.log(user)

        if (!user) {
            return response(res, 404, false, "User not found");
        }

        // Admin can access any shop
        if (user.role === "admin") {
            // If admin provides a shopId in params/query, use that
            if (req.params.shopId || req.query.shopId) {
                req.shopId = req.params.shopId || req.query.shopId;
            }
            console.log("admin query found", req.shopId)
            next();
            return;
        }

        // Owner and user roles must have a shop assigned
        if (!user.shop) {
            return response(res, 403, false, "No shop assigned to this user");
        }

        req.shopId = user.shop._id || user.shop;
        console.log("shopAccess: shopId set to", req.shopId)

        next();
    } catch (error) {
        console.error(error);
        return response(res, 500, false, "Internal server error");
    }
};