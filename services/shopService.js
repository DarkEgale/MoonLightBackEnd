import Shop from "../models/shop.model.js";

// create shop

export const createShop = async (data, id) => {
    try {
        const shop = await Shop.create({
            userId: id,
            name: data.name,
            address: data.address,
            type: data.type,
            email: data.email || '',
            phone: data.phone || ''
        });
        return shop;
    } catch (error) {
        console.error(error);
    }
};

// update shop

export const updateShop = async (data, shopId) => {
    try {
        const updateData = {
            name: data.name,
            address: data.address,
            type: data.type,
            email: data.email || '',
            phone: data.phone || ''
        };
        const newShop = await Shop.findByIdAndUpdate(shopId, updateData, { new: true })
        if (!newShop) {
            throw new Error("Failed to update Shop")
        }
        return newShop
    } catch (error) {
        throw error
    }
}

// delete shop

export const deleteShop = async (shopId) => {
    try {
        const deleteShop = await Shop.findByIdAndDelete(shopId)
        return deleteShop
    } catch (error) {
        throw error
    }
}

// get all shops

export const getShops = async (userId) => {
    try {
        const shops = await Shop.find({})
        if (!shops) {
            return new Error("No Shop found")
        }
        return (
            shops
        )
    } catch (error) {
        throw error
    }
}