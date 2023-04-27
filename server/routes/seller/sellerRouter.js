const express = require('express')
const router = express.Router()
const { createSellerProduct, getAllSellerProducts, getSellerProductById, updateSellerProduct, deleteSellerProduct } = require('./controller/sellerController')
const { jwtMiddleware } = require('../validator/lib/index')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Hello World from sellerRouter!')
})

router.post('/create-seller-product', jwtMiddleware, createSellerProduct)
router.get('/all-seller-products', jwtMiddleware, getAllSellerProducts)
router.get('/seller-product/:productId', jwtMiddleware, getSellerProductById)
router.put('/update-seller-product/:productId', jwtMiddleware, updateSellerProduct)
router.delete('/delete-seller-product/:productId', jwtMiddleware, deleteSellerProduct)

module.exports = router