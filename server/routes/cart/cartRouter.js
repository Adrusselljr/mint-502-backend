const express = require('express')
const router = express.Router()
const { getCart, addToCart, removeFromCart, deleteCart } = require('./controller/cartController')
const { jwtMiddleware } = require('../validator/lib/index')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Hello World from cartRouter!')
})

router.get('/get-cart/:cartId', jwtMiddleware, getCart)
router.put('/add-to-cart/:cartId', jwtMiddleware, addToCart)
router.put('/remove-from-cart/:cartId', jwtMiddleware, removeFromCart)
router.delete('/delete-cart/:cartId', jwtMiddleware, deleteCart)

module.exports = router