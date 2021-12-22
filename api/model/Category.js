const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({

    code: {
        required: false,
        type: String
    },
    title: {
        type: String,
        required: true,
        max: 255,
    },
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);