import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user ID']
    },
    name: {
        type: String,
        required: [true, 'Please provide shop name']
    },
    address: {
        type: String,
        required: [true, 'Please provide shop address']
    },
    type: {
        type: String,
        required: [true, 'Please provide shop type']
    },
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    }
}, { timestamps: true })

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;