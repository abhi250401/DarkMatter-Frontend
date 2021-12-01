const mongoose = require('mongoose');
const StockSchema = new mongoose.Schema({
    stockId: {
        type: String
    },
    slug: {
        type: String,
        required: true,
        max: 255,
    },
    name: {
        type: String,
        required: true,
        max: 255,
    },
    description: {
        type: String,
        required: false
    },
    catergory: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
    },

    /*  
    stockID
    categoryID
    created
    updated
    */
});
module.exports = mongoose.model('Stock', StockSchema);