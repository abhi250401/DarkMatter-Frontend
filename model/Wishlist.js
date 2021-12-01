const mongoose = require('mongoose');




const wishListSchema = new mongoose.Schema({

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