import { createEmploye, updateEmploye, deleteEmploye, getAllEmploye } from "../services/employeService.js";
import response from "../helpers/response.js";

export const createEmployeController = async (req, res) => {
    try {
        const data = req.body
        const employe = await createEmploye(data)

        return response(res, 201, true, "Employee created successfully", employe)
    } catch (error) {
        return response(res, 400, false, error.message)
    }
}

export const updateEmployeController = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        const updatedEmploye = await updateEmploye(data, id)

        return response(res, 200, true, "Employee updated successfully", updatedEmploye)
    } catch (error) {
        return response(res, 400, false, error.message)
    }
}

export const deleteEmployeController = async (req, res) => {
    try {
        const id = req.params.id
        const deletedEmploye = await deleteEmploye(id)

        return response(res, 200, true, "Employee deleted successfully")
    } catch (error) {
        return response(res, 400, false, error.message)
    }
}

// get all employees for a shop
export const getAllEmployeController = async (req, res) => {
    try {
        const shopId = req.shopId || req.params.shopId;
        const employees = await getAllEmploye(shopId)

        return response(res, 200, true, "Employees found", employees)
    } catch (error) {
        return response(res, 400, false, error.message)
    }
}
