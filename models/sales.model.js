import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
    {
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
            required: [true, "Shop id is required"],
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product id is required"],
        },

        customerName: {
            type: String,
            required: [true, "Customer name is required"],
        },

        customerPhone: {
            type: String,
            required: [true, "Customer phone number is required"],
        },

        customerAddress: {
            type: String,
        },

        totalPrice: {
            type: Number,
            required: [true, "Total price is required"],
        },

        status: {
            type: String,
            enum: ["paid", "unpaid", "partial"],
            default: "paid",
            required: true,
        },

        dueAmount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

saleSchema.index({ customeName: 'text', customerPhone: 1, createdAt: -1 })

const Sale = mongoose.model("Sale", saleSchema);
export default Sale;