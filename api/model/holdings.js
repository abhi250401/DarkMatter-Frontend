const mongoose = require('mongoose');
const HoldingsSchema = new mongoose.Schema({
    holdingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Stock',
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    //  Bought/Sold on
    datetime: {
        type: String,
        required: true
    }
}, { timestamps: true });
module.exports = mongoose.model('Holdings', HoldingsSchema);