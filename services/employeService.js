import User from "../models/user.model.js";
import hashPassword from "../helpers/hash.js";
import { get } from "mongoose";

// create employee
export const createEmploye = async (data) => {
    try {
        const exists = await User.findOne({ email: data.email })
        if (exists) {
            throw new Error("Email already exists")
        }

        const hashedPassword = await hashPassword(data.password)

        const employe = await User.create({
            name: data.name,
            phone: data.phone,
            email: data.email,
            password: hashedPassword,
            role: data.role || "user",
            shop: data.shop || null
        })

        return employe
    } catch (error) {
        throw error
    }
}

// update employee
export const updateEmploye = async (data, id) => {
    try {
        const updateData = { ...data }

        // Email and password update not allowed here
        delete updateData.email
        delete updateData.password

        const updatedEmploye = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select("-password")

        if (!updatedEmploye) {
            throw new Error("Employee not found")
        }

        return updatedEmploye
    } catch (error) {
        throw error
    }
}

// delete employee
export const deleteEmploye = async (id) => {
    try {
        const deletedEmploye = await User.findByIdAndDelete(id)

        if (!deletedEmploye) {
            throw new Error("Employee not found")
        }

        return deletedEmploye
    } catch (error) {
        throw error
    }
}

// get all employe

export const getAllEmploye = async (shopId) => {
    try {
        let employees;
        if (shopId) {
            employees = await User.find({ role: "user", shop: shopId }).select("-password")
        } else {
            employees = await User.find({ role: "user" }).select("-password")
        }
        if (!employees || employees.length === 0) {
            throw new Error("No employee found")
        }
        return employees
    } catch (error) {
        throw error
    }
}

// get single employee

export const getSingleEmploye = async (employeId) => {
    try {
        if (!employeId) {
            throw new Error("Please provide a employeId")
        }
        const employee = await User.findById(employeId)
        if (!employee) {
            throw new Error("Employe not found")
        }
    } catch (error) {
        throw error
    }
}