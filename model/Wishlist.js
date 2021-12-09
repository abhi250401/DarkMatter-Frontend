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
    user: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    stock: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Stock' 
    }],
});
module.exports = mongoose.model('wishlist', wishListSchema);