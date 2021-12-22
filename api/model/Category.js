const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoryId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    code: {
        required: true,
        type: String
    },
    title: {
        type: String,
        required: true,
        max: 255,
    },
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);