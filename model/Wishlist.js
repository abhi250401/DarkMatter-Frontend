const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    listId: {
        type: String,
        required: true,
    },
    stockId: {
        type: String,
        required: true,
    },
    stockCode: {
        type: String
    },

    stock: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    }],
}, { timestamps: true });
module.exports = mongoose.model('wishlist', wishListSchema);