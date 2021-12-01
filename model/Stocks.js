const mongoose = require('mongoose');
const StockSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        max: 255,

    },
    price: {
        type: Number,
        required: true,


    },
    description: {
        type: String,
        required: false
    },
    Catergory: {
        required: false,
        type: String
    },


    /*  stockID
      categoryID
      slug
      name
      description
      price 
      created
      updated
      */


});
module.exports = mongoose.model('Stock', StockSchema);