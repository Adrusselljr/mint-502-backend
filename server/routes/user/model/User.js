const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "First name is required."],
        minLength: [2, "First name should be a minimum of 2 characters."]
    },

    lastName: {
        type: String,
        required: [true, "Last name is required."],
        minLength: [2, "Last name should be a minimum of 2 characters."]
    },

    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Password is required."]
    },

    address: {
        type: String
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    sellerHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'seller'
    }],

    purchaseHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'cart'
    }],

    userCart: {
        type: mongoose.Schema.ObjectId,
        ref: 'cart'
    }

}, {timestamps: true})

module.exports = mongoose.model('user', UserSchema)