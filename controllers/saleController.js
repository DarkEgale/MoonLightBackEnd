import Sale from "../models/sales.model.js";
import { createsale, updateSale, deleteSale, getAllSales, getSingleSale, dueSale, updateDueSale } from "../services/saleService.js";
import response from "../helpers/response.js";

// create sale
export const createSaleController = async (req, res) => {
    try {
        const data = req.body;
        const shopId = req.shopId;

        const sale = await createsale(data, shopId);

        return response(res, 201, true, "Sale created successfully", sale);
    } catch (error) {
        console.error(error);
        return response(res, 400, false, error.message);
    }
};

// update sale
export const updateSaleController = async (req, res) => {
    try {
        const data = req.body;
        const saleId = req.params.id;

        const updatedSale = await updateSale(data, saleId);

        return response(res, 200, true, "Sale updated successfully", updatedSale);
    } catch (error) {
        console.error(error);
        return response(res, 400, false, error.message);
    }
};

// delete sale
export const deleteSaleController = async (req, res) => {
    try {
        const saleId = req.params.id;

        const deletedSale = await deleteSale(saleId);

        return response(res, 200, true, "Sale deleted successfully", deletedSale);
    } catch (error) {
        console.error(error);
        return response(res, 400, false, error.message);
    }
};

// get all sales with pagination and status filter
export const getAllSalesController = async (req, res) => {
    try {
        const shopId = req.shopId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const status = req.query.status || "";

        let filter = { shopId };
        if (status) filter.status = status;

        const sales = await getAllSales(shopId, filter, skip, limit);
        const total = await Sale.countDocuments(filter);

        return response(res, 200, true, "Sales found", {
            data: sales,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error(error);
        return response(res, 500, false, "Internal server error");
    }
};

// get single sale
export const getSingleSaleController = async (req, res) => {
    try {
        const saleId = req.params.id;

        const sale = await getSingleSale(saleId);

        return response(res, 200, true, "Sale found", sale);
    } catch (error) {
        console.error(error);
        return response(res, 404, false, error.message);
    }
};

// get due sales
export const getDueSalesController = async (req, res) => {
    try {
        const shopId = req.shopId;

        const dueSales = await dueSale(shopId);

        if (!dueSales || dueSales.length === 0) {
            return response(res, 404, false, "No due sales found");
        }

        return response(res, 200, true, "Due sales found", dueSales);
    } catch (error) {
        console.error(error);
        return response(res, 500, false, "Internal server error");
    }
};

// update due sale
export const updateDueSaleController = async (req, res) => {
    try {
        const saleId = req.params.id;
        const data = req.body;

        const updatedDueSale = await updateDueSale(saleId, data);

        return response(res, 200, true, "Due sale updated successfully", updatedDueSale);
    } catch (error) {
        console.error(error);
        return response(res, 400, false, error.message);
    }
};