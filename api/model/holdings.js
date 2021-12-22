const mongoose = require('mongoose');
const HoldingsSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        ref: 'Stock',
    },
    quantity: {
        type: Number,
        required: true
    },
    name: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    //  Bought/Sold on
    datetime: {
        type: String,
        required: true
    },
    stockCode: {
        type: String,
        required: false
    }
}, { timestamps: true });
module.exports = mongoose.model('Holdings', HoldingsSchema);