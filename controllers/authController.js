
import User from "../models/user.model.js";
import response from "../helpers/response.js";
import { userLogin, getMe, getAllUsers, changePassword } from "../services/userService.js";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await userLogin({ email, password })
        const cookieOption = ({
            httpOnly: true,
            sameSite: 'none',//for production
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.cookie("token", result.token, cookieOption)
        response(res, 200, true, "Login Successful", result.user)
    } catch (error) {
        if (error.message === "Unauthorize") {
            return response(res, 401, false, "Unauthorize")
        }
        response(res, 500, false, "Internal Server Error")
        console.error(error)
    }
}

export const Me = async (req, res) => {
    try {
        const id = req.user?._id
        const user = await getMe(id)
        response(res, 200, true, "User found", user)
    } catch (error) {
        if (error.message === "not found") {
            return response(res, 404, false, "user not found")
        }
        return response(res, 500, false, "Internal server error")
    }
}

export const changePasswordController = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user._id;

        if (!currentPassword || !newPassword) {
            return response(res, 400, false, "Current password and new password are required");
        }

        if (newPassword.length < 6) {
            return response(res, 400, false, "New password must be at least 6 characters");
        }

        await changePassword(userId, currentPassword, newPassword);
        return response(res, 200, true, "Password changed successfully");
    } catch (error) {
        if (error.message === "Current password is incorrect") {
            return response(res, 400, false, "Current password is incorrect");
        }
        if (error.message === "User not found") {
            return response(res, 404, false, "User not found");
        }
        return response(res, 500, false, "Internal Server Error");
    }
};

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });
        return response(res, 200, true, "Logout successful");
    } catch (error) {
        return response(res, 500, false, "Internal Server Error");
    }
};

// get all users (admin only)
export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers()
        response(res, 200, true, "All users found", users)
    } catch (error) {
        return response(res, 500, false, error.message)
    }
}

