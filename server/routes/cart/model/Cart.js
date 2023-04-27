const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({

    cartOwner: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },

    products: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'product'
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },

        price: {
            type: Number,
            required: true,
            default: 1.00
        }
    }],

    bill: {
        type: Number,
        required: true,
        default: 0
    }

}, {timestamps: true})

module.exports = mongoose.model('cart', CartSchema)