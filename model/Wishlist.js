const mongoose = require('mongoose');




const wishListSchema = new mongoose.Schema({

    stockId: {
        type: String
    },


    userId: {
        type: String,

    },
    listId: {
        type: String,

    },
});
module.exports = mongoose.model('wishlist', wishListSchema);