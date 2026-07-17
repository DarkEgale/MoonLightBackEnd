import Product from "../models/products.model.js";


//create products

export const createProduct = async (data, shopId) => {
    try {
        if (!data) {
            throw new Error("Please Provide data")
        }
        if (!shopId) {
            throw new Error("Please provide shop id")
        }
        const product = await Product.create({
            shopId: shopId,
            name: data.name,
            buyingPrice: data.buyingPrice,
            sellingPrice: data.sellingPrice,
            sku: data.sku,
            company: data.company,
            quantity: data.quantity
        });
        return product;
    } catch (error) {
        throw error;
    }
}

// update products

export const updateProducts = async (data, productId) => {
    try {
        if (!productId) {
            throw new Error("Please provide product Id")
        }
        if (!data) {
            throw new Error("Please provide upadetable product data")
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId, data, { new: true })
        if (!updatedProduct) {
            throw new Error("Not found updated product")
        }
        return updatedProduct
    } catch (error) {
        throw error
    }
}

// delete products

export const deleteProduct = async (productId) => {
    try {
        if (!productId) {
            throw new Error("Please provide a product Id")
        }
        const deleteProduct = await Product.findByIdAndDelete(productId)
        return deleteProduct
    } catch (error) {
        throw error
    }
}

// get single product

export const getSingleProduct = async (productId) => {
    try {
        if (!productId) {
            throw new Error("Please provide product id")
        }
        const product = await Product.findById(productId)
        if (!product) {
            throw new Error("Product not found")
        }
        return product
    } catch (error) {
        throw error
    }
}

// get all products with pagination

export const getAllProducts = async (shopId, filter = {}, skip = 0, limit = 10) => {
    try {
        if (!shopId) {
            throw new Error("Please provide a shop id")
        }
        const products = await Product.find({ shopId, ...filter })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return products
    } catch (error) {
        throw error
    }
}

