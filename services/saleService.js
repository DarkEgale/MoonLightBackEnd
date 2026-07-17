import Sale from "../models/sales.model.js";


// create sale
export const createsale = async (data, shopId) => {
    try {
        if (!data) {
            throw new Error("Please provide data")
        }
        if (!shopId) {
            throw new Error("Please provide shop id")
        }
        const sale = await Sale.create({ ...data, shopId })
        if (!sale) {
            throw new Error("Sale not create")
        }
        return sale;

    } catch (error) {
        throw error
    }
}

// update sale

export const updateSale = async (data, saleId) => {
    try {
        if (!saleId) {
            throw new Error(" Please provide a sale Id")
        }
        const updatedSale = await Sale.findByIdAndUpdate(saleId, data, { new: true })
        if (!updatedSale) {
            throw new Error("Not update sale")
        }
        return updatedSale;
    } catch (error) {
        throw error
    }
}

// delete sale

export const deleteSale = async (saleId) => {
    try {
        if (!saleId) {
            throw new Error("Please provide a sale id")
        }
        const deleteSale = await Sale.findByIdAndDelete(saleId)
        return deleteSale;
    } catch (error) {
        throw error
    }
}

// get all sales with pagination

export const getAllSales = async (shopId, filter = {}, skip = 0, limit = 10) => {
    try {
        if (!shopId) {
            throw new Error("Please provide a shop Id")
        }
        const sales = await Sale.find({ shopId, ...filter })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return sales;
    } catch (error) {
        throw error;
    }
}

// get single sale

export const getSingleSale = async (saleId) => {
    try {
        if (!saleId) {
            throw new Error("Please provide a sale Id")
        }
        const sale = await Sale.findById(saleId)
        if (!sale) {
            throw new Error("Sale not found")
        }
        return sale;
    } catch (error) {
        throw error;
    }
}

// get due sale

export const dueSale = async (shopId) => {
    try {
        if (!shopId) {
            throw new Error("Please provide a shop Id")
        }
        const dueSale = await Sale.find({ shopId: shopId, status: "partial" })
        if (!dueSale) {
            throw new Error("Not found Due Sale")
        }
        return dueSale;
    } catch (error) {
        throw error;
    }
}

// update due sale

export const updateDueSale = async (saleId, data) => {
    try {
        if (!saleId) {
            throw new Error("Please provide a sale id")
        }
        const updatedDueSale = await Sale.findByIdAndUpdate(saleId, data, { new: true })
        return updatedDueSale;
    } catch (error) {
        throw error
    }
}
