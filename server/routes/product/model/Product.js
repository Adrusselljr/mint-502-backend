const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: [true, "Please enter a product name."],
        minLength: [2, "Product name must be minimum of 2 characters."]
    },

    productDescription: {
        type: String,
        required: [true, "Please enter a product description."]
    },

    productBrand: {
        type: String,
        default: "Other"
    },

    productCategory: {
        type: String,
        default: "Other"
    },

    productImage: [{
        type: String,
        default: '../../../images/default-product.png'
    }],

    productCostBySize: [{
        size: {
            type: String,
            required: [true, "Please select a size."]
        },
        
        price: {
            type: Number,
            required: [true, "Please enter a price for this item."]
        }
    }]

}, {timestamps: true})

module.exports = mongoose.model('product', ProductSchema)