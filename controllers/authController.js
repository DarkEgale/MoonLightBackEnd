
import User from "../models/user.model.js";
import response from "../helpers/response.js";
import { userRegistration, userLogin, getMe } from "../services/userService.js";

export const Registration = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body
        console.log(name, phone, email, password)
        const result = await userRegistration({ name, phone, email, password })
        const cookieOption = ({
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.cookie("token", result.token, cookieOption)
        response(res, 201, true, "User registration successful", result.user)
    } catch (error) {
        if (error.message === "email exists") {
            return response(res, 400, false, "Email already exists")
        }
        if (error.message === "not found") {
            return response(res, 404, false, "User Data not found")
        }
        response(res, 500, false, "Internal Server Error")
        console.log(error)
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await userLogin({ email, password })
        const cookieOption = ({
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.cookie("token", result.token, cookieOption)
        response(res, 200, true, "Login Successful", result.user)
    } catch (error) {
        if (error.message === "Unauthorize") {
            return response(res, 401, false, "Unauthorize")
        }
        response(res, 500, false, "Internal Server Error")
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

