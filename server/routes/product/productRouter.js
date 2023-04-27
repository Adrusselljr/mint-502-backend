const express = require('express')
const router = express.Router()
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('./controller/productController')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Hello World from productRouter!')
})

router.post('/create-product', createProduct)
router.get('/get-all-products', getAllProducts)
router.get('/get-product/:productId', getProductById)
router.put('/update-product/:productId', updateProduct)
router.delete('/delete-product/:productId', deleteProduct)

module.exports = router