import Product from "../models/products.model.js";
import { createProduct, updateProducts, deleteProduct, getAllProducts, getSingleProduct } from "../services/productService.js";
import response from "../helpers/response.js";

// create product
export const createProductController = async (req, res) => {
    try {
        const data = req.body;
        const shopId = req.shopId;

        const product = await createProduct(data, shopId);

        return response(res, 201, true, "Product created successfully", product);
    } catch (error) {
        console.error(error);
        return response(res, 400, false, error.message);
    }
};

// update product
export const updateProductController = async (req, res) => {
    try {
        const data = req.body;
        const productId = req.params.id;

        const updatedProduct = await updateProducts(data, productId);

        return response(res, 200, true, "Product updated successfully", updatedProduct);
    } catch (error) {
        console.error(error);
        return response(res, 400, false, error.message);
    }
};

// delete product
export const deleteProductController = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await deleteProduct(productId);

        return response(res, 200, true, "Product deleted successfully", deletedProduct);
    } catch (error) {
        console.error(error);
        return response(res, 400, false, error.message);
    }
};

// get all products with pagination and category/company filter
export const getAllProductsController = async (req, res) => {
    try {
        const shopId = req.shopId;
        console.log("This is the shop id waht reach in controllers", shopId)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const company = req.query.company || "";
        const status = req.query.status || "";

        let filter = { shopId };
        if (company) filter.company = { $regex: company, $options: "i" };
        if (status) filter.status = status;

        const products = await getAllProducts(shopId, filter, skip, limit);
        const total = await Product.countDocuments(filter);

        return response(res, 200, true, "Products found", {
            data: products,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error(error);
        return response(res, 500, false, "Internal server error");
    }
};

// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await getSingleProduct(productId);

        return response(res, 200, true, "Product found", product);
    } catch (error) {
        console.error(error);
        return response(res, 404, false, error.message);
    }
};