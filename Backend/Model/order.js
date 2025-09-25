const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",  
        required: true
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "Books", 
        required: true
    },
    status: {
        type: String,
        enum: ["Order Placed", "Out for Delivery", "Cancelled"],
        default: "Order Placed"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
