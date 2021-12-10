const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    listId: {
        type: String,
        required: true,
    },
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Stock',
    }
}, { timestamps: true });
module.exports = mongoose.model('wishlist', wishListSchema);