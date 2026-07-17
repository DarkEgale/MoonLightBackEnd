import hashPassword from "../helpers/hash.js";
import genToken from "../helpers/genToken.js";
import User from "../models/user.model.js";
import verifyHash from "../helpers/verifyHash.js";

//change password
export const changePassword = async (userId, currentPassword, newPassword) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await verifyHash(currentPassword, user.password);
        if (!isMatch) {
            throw new Error("Current password is incorrect");
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();

        return { message: "Password changed successfully" };
    } catch (error) {
        throw error;
    }
};

export const userLogin = async (userData) => {
    try {
        const user = await User.findOne({ email: userData.email })
        if (!user) {
            throw new Error("Unauthorize")
        }
        const verifyHashPassword = await verifyHash(userData.password, user.password)
        if (!verifyHashPassword) {
            throw new Error('Unauthorize')
        }
        const token = await genToken(user._id)
        return {
            user: user,
            token
        }
    } catch (error) {
        throw error;
    }
}


// me route for profile

export const getMe = async (id) => {
    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            throw new Error("not found")
        }
        return {
            user: user
        }
    } catch (error) {
        throw new Error(`Error during getting me: ${error.message}`)
    }
}

// get all users (admin only)
export const getAllUsers = async () => {
    try {
        const users = await User.find({}).select("-password").populate("shop")
        if (!users || users.length === 0) {
            throw new Error("No users found")
        }
        return users
    } catch (error) {
        throw new Error(`Error getting users: ${error.message}`)
    }
}

//update user

export const updateUser = async (userData, id) => {
    try {
        const updateData = { ...userData };

        // Email update not allowed
        delete updateData.email;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};



