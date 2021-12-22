const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true,
        max: 255,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false,
    },
    aadhar: {
        type: Number,
        required: false,
    },
    aadhaar: {
        type: String,
        required: false,
    },
    pan: {
        type: String,
        required: false,
    },
    dob: {
        type: Date,
        required: false,
    },
    verify: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String
    },
    aadhaar: {
        type: String
    },
    voterId: {
        type: String
    },
    panFile: {
        type: String
    }
    /*lists: [
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock'
        }],
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock'
        }],
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock'
        }],
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock'
        }],
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock'
        }],
    ]
    /* 
    fileID
    planID
    mobile
    gender
    company
    address
    pincode
    state
    country
    aadhaarID
    aadhaarNo
    panID
    panNo
    picture
    created
    Updated
    planCategories
    */
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);