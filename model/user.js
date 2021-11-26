const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
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
        type: Number,
        required: false,
    },
    aadhar: {
        type: Number,
        required: false,
    },
    aadhaar: {
        type: Number,
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
    verified: {
        type: Number,
        required: false,
    },
    status: {
        type: Number,
        required: true,
    }




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


});
module.exports = mongoose.model('User', UserSchema);