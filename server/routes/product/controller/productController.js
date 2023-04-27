const Product = require('../model/Product')

// Create product
const createProduct = async (req, res) => {
    const { productName, productDescription, productBrand, productCategory, productImage, productCostBySize } = req.body

    try {
        const newProduct = new Product({
            productName: productName,
            productDescription: productDescription,
            productBrand: productBrand,
            productCategory: productCategory,
            productImage: productImage,
            productCostBySize: productCostBySize
        })
        const savedProduct = await newProduct.save()
        res.status(200).json({ message: "New product have been saved", payload: savedProduct })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

// Get all products
const getAllProducts = async (req, res) => {
    try {
        let allProducts = await Product.find()
        res.status(200).json({ payload: allProducts })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

// Get product by id
const getProductById = async (req, res) => {
    const { productId } = req.params

    try {
        let product = await Product.findById(productId)
        if(!product) throw { message: "No product with id found." }
        res.status(200).json({ payload: product })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

// Update product
const updateProduct = async (req, res) => {
    const { productId } = req.params

    try {
        const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, req.body, { new: true })
        if(!updatedProduct) throw { message: "No product with id found." }
        res.status(200).json({ message: "Updated product", payload: updatedProduct })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

// Delete product
const deleteProduct = async (req, res) => {
    const { productId } = req.params

    try {
        let deletedProduct = await Product.findByIdAndDelete(productId)
        if(!deletedProduct) throw { message: "No product with id found." }
        res.status(200).json({ message: "Product has been deleted.", payload: deletedProduct })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}