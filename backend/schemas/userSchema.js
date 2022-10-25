const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates a schematic for a new user being entered into the database
const newUser = new Schema({
    Name: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
        trim: true,
    },

    Login: {
        type: String,
        required: true
    },

    Password: {
        type: String,
        required: true
    },


    isVerified: {
        type: Boolean,
        default: false,
        required: true,
    }
    
}, {timestamps: true}, {collection: 'User'});

const User = mongoose.model('User', newUser);
module.exports = User;