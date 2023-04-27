const Seller = require('../model/Seller')
const User = require('../../user/model/User')

// Create seller product
const createSellerProduct = async (req, res) => {
    const decodedToken = res.locals.decodedToken
    const { sellerProductName, sellerProductDescription, sellerProductBrand, sellerProductCategory, sellerProductImage, sellerProductCostBySize } = req.body

    try {
        const foundUser = await User.findOne({ _id: decodedToken._id })
        if(!foundUser) throw { message: "User not found." }

        const newSeller = new Seller({
            sellerProductName: sellerProductName,
            sellerProductDescription: sellerProductDescription,
            sellerProductBrand: sellerProductBrand,
            sellerProductCategory: sellerProductCategory,
            sellerProductImage: sellerProductImage,
            sellerProductCostBySize: sellerProductCostBySize,
            sellerProductOwner: foundUser._id
        })
        const savedSeller = await newSeller.save()
        foundUser.sellerHistory.push(savedSeller._id)
        await foundUser.save()
        res.status(200).json({ message: "New product for user has been saved.", user: foundUser, payload: savedSeller})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

// Get all sellers products
const getAllSellerProducts = async (req, res) => {
    const decodedToken = res.locals.decodedToken

    try {
        const foundUser = await User.findOne({ _id: decodedToken._id })
        if(!foundUser) throw { message: "User not found." }
        const SellerProducts = await Seller.find({ sellerProductOwner: foundUser._id })
        if(!SellerProducts) throw { message: "No products from user found." }
        res.status(200).json({ user: foundUser, payload: SellerProducts })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

// Get seller product by id
const getSellerProductById = async (req, res) => {
    const decodedToken = res.locals.decodedToken
    const { productId } = req.params

    try {
        const foundUser = await User.findOne({ _id: decodedToken._id })
        if(!foundUser) throw { message: "User not found." }
        const sellerProduct = await Seller.findById(productId).populate("sellerProductOwner")
        if(!sellerProduct) throw { message: "No product with id found." }
        res.status(200).json({ payload: sellerProduct })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

// Update seller product
const updateSellerProduct = async (req, res) => {
    const decodedToken = res.locals.decodedToken
    const { productId } = req.params

    try {
        const foundUser = await User.findOne({ _id: decodedToken._id })
        if(!foundUser) throw { message: "User not found." }
        const sellerProduct = await Seller.findById(productId).populate("sellerProductOwner")
        if(!sellerProduct) throw { message: "No product with id found." }

        if(foundUser._id.toString() === sellerProduct.sellerProductOwner._id.toString()) {
            const updatedSellerProduct = await Seller.findByIdAndUpdate(productId, req.body, { new: true })
            res.status(200).json({ message: "Sellers product has been updated.", payload: updatedSellerProduct })
        }
        else {
            throw { message: "You do not have permissions!" }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

// Delete seller product
const deleteSellerProduct = async (req, res) => {
    const decodedToken = res.locals.decodedToken
    const { productId } = req.params

    try {
        const foundUser = await User.findOne({ _id: decodedToken._id })
        if(!foundUser) throw { message: "User not found." }
        const sellerProduct = await Seller.findById(productId).populate("sellerProductOwner")
        if(!sellerProduct) throw { message: "No product with id found." }

        if(foundUser._id.toString() === sellerProduct.sellerProductOwner._id.toString()) {
            const deletedSellerProduct = await Seller.findByIdAndDelete(productId)
            await foundUser.sellerHistory.pull(productId)
            await foundUser.save()
            res.status(200).json({ message: "Seller product was deleted", payload: deletedSellerProduct })
        }
        else {
            throw { message: "You do not have permissions!" }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

module.exports = {
    createSellerProduct,
    getAllSellerProducts,
    getSellerProductById,
    updateSellerProduct,
    deleteSellerProduct
}