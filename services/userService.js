import hashPassword from "../helpers/hash.js";
import genToken from "../helpers/genToken.js";
import User from "../models/user.model.js";
import verifyHash from "../helpers/verifyHash.js";

export const userRegistration = async (userData) => {
    try {
        const exists = await User.findOne({ email: userData.email });

        if (exists) {
            throw new Error("email exists");
        }

        const hashedPassword = await hashPassword(userData.password);

        const newUser = await User.create({
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            password: hashedPassword,
        });

        const token = await genToken(newUser._id);

        return {
            user: newUser,
            token,
        };

    } catch (error) {
        throw error
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



