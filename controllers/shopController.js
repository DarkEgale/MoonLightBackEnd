import Shop from "../models/shop.model.js";
import { createShop, updateShop, deleteShop, getShops } from "../services/shopService.js";
import response from "../helpers/response.js";

export const createShopController = async (req, res) => {
    try {
        const data = req.body;

        const shop = await createShop(data, req.user._id);

        return response(res, 201, true, "Shop created successfully", shop);
    } catch (error) {
        console.error(error);
        return response(res, 400, false, error.message);
    }
};

export const updateShopController = async (req, res) => {
    try {
        const data = req.body;
        const shopId = req.params.id;
        const updatedShop = await updateShop(data, shopId)
        return response(res, 200, true, "Shop updated successfully", updatedShop)
    } catch (error) {
        response(res, 500, false, "Internal server error")
    }
}

export const deleteShopController = async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await deleteShop(id)
        return response(res, 200, true, "Shop was deleted")
    } catch (error) {
        response(res, 500, false, "Internal server error")
        console.error(error)
    }
}

// get all shop 

export const getShopsController = async (req, res) => {
    try {
        const id = req.params
        const shops = await getShops(id)
        if (!shops) {
            return response(res, 404, false, "No Shop found")
        }
        return response(res, 200, true, "Shops found", shops)
    } catch (error) {
        response(res, 500, false, "Internal server error")
    }
}