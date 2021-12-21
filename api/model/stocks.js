const mongoose = require('mongoose');
const StockSchema = new mongoose.Schema({
    stockId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    code: {
        required: true,
        type: String
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
    percentage: {
        type: Number,
        required: true
    },
    stockCode: {
        required: true,
        type: String
    }

    /*  
    stockID
    categoryID
    created
    updated
    */
}, { timestamps: true });

module.exports = mongoose.model('Stock', StockSchema);