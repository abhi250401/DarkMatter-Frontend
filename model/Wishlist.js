const mongoose = require('mongoose');
const stockSchema = new mongoose.Schema({
    stock_Id: {
        type: mongoose.Types.ObjectId('Stock')
    },

}, { _id: false });
const wishListSchema = new mongoose.Schema({
    stock: {
        type: [stockSchema]
    },
    stock_id: {
        type: String
    },


    user_id: {
        type: String,

    },
    listId: {
        type: String,

    },
});
module.exports = mongoose.model('wishlist', wishListSchema);