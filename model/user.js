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
    }



    /* userID
     fileID
     planID
     name
     email
     mobile
     password
     gender
     dob
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
     role
     status
     verified
     created
     Updated
     planCategories
     */


});
module.exports = mongoose.model('User', UserSchema);