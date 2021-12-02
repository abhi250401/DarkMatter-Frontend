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
    stockName: {
        type: String,

    }
});
module.exports = mongoose.model('wishlist', wishListSchema);