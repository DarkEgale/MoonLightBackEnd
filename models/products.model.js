import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: [true, 'Please provide shop ID']
    },
    name: {
        type: String,
        required: [true, 'Please provide product name']
    },
    buyingPrice: {
        type: Number,
        required: [true, 'Please provide product buying price']
    },
    sellingPrice: {
        type: Number,
        required: [true, 'Please provide product selling price']
    },
    sku: {
        type: String,
        required: [true, 'Please provide product SKU']
    },
    company: {
        type: String,
        required: [true, 'Please provide product company']
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide product quantity']
    },
    status: {
        type: String,
        enum: ['in-stock', 'out-of-stock', 'discontinued'],
        default: 'in-stock'
    }
})
productSchema.index({ name: 'text', sku: 'text', company: 'text', shopId: 1 });
const Product = mongoose.model('Product', productSchema);
export default Product;