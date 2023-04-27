const mongoose = require('mongoose')

const SellerSchema = new mongoose.Schema({

    sellerProductName: {
        type: String,
        required: [true, "Please enter a product name."],
        minLength: [2, "Product name must be minimum of 2 characters."]
    },

    sellerProductDescription: {
        type: String,
        required: [true, "Please enter a product description."]
    },

    sellerProductBrand: {
        type: String,
        default: "Other"
    },

    sellerProductCategory: {
        type: String,
        default: "Other"
    },

    sellerProductImage: [{
        type: String,
        default: '../../../images/default-product.png'
    }],

    sellerProductCostBySize: {
        size: {
            type: String,
            required: [true, "Please select a size."]
        },
        
        price: {
            type: Number,
            required: [true, "Please enter a price for this item."]
        }
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    sellerProductOwner: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }

}, {timestamps: true})

module.exports = mongoose.model('seller', SellerSchema)