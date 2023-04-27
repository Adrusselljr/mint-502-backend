const Cart = require('../model/Cart')
const Product = require('../../product/model/Product')
const User = require('../../user/model/User')

// Get cart
const getCart = async (req, res) => {
    const decodedToken = res.locals.decodedToken
    const { cartId } = req.params

    try {
        const foundUser = await User.findOne({ _id: decodedToken._id })
        if(!foundUser) throw { message: "User not found." }
        const foundCart = await Cart.findById(cartId)
        if(!foundCart) throw { message: "Cart not found." }

        if(foundUser._id.toString() === foundCart.cartOwner._id.toString()) {
            const showCart = await foundCart.populate({ path: 'cartOwner', populate: { path: 'products.product' } })
            res.status(200).json({ payload: showCart })
        }
        else {
            throw { message: "You do not have permissions." }
        }
    }
    catch (err) {
        res.status(500).json({ message: "error", error: err.message })
    }
}

// Add to cart
const addToCart = async (req, res) => {
    const decodedToken = res.locals.decodedToken
    const { cartId } = req.params
    const { productId, quantity } = req.body

    try {
        const foundUser = await User.findOne({ _id: decodedToken._id })
        if(!foundUser) throw { message: "User not found." }
        const foundCart = await Cart.findById(cartId)
        if(!foundCart) throw { message: "Cart not found." }
        const foundProduct = await Product.findById(productId)
        if(!foundProduct) throw { message: "Product not found." }

        if(foundUser._id.toString() === foundCart.cartOwner._id.toString()) {
            const updatedCart = await Cart.findOneAndUpdate(
                { cartOwner: foundUser._id },
                {
                    $push: {
                        products: {
                            product: productId,
                            quantity: quantity,
                            price: foundProduct.productCostBySize[0].price * quantity
                        },
                    },
                },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )
            const totalPrice = updatedCart.products.reduce((acc, p) => acc + p.price, 0)
            updatedCart.bill = totalPrice
            await updatedCart.save()
            res.status(200).json({ message: "Cart has been updated.", payload: updatedCart })
        }
        else {
            throw { message: "You do not have permissions." }
        }
    }
    catch (err) {
        res.status(500).json({ message: "error", error: err.message })
    }
}

// Remove from cart
const removeFromCart = async (req, res) => {
    const decodedToken = res.locals.decodedToken
    const { cartId } = req.params
    const { productId, quantity } = req.body

    try {
        const foundUser = await User.findOne({ _id: decodedToken._id })
        if(!foundUser) throw { message: "User not found." }
        const foundCart = await Cart.findById(cartId)
        if(!foundCart) throw { message: "Cart not found." }
        const foundProduct = await Product.findById(productId)
        if(!foundProduct) throw { message: "Product not found." }

        if(foundUser._id.toString() === foundCart.cartOwner._id.toString()) {
            const updatedCart = await Cart.findOneAndUpdate(
                { cartOwner: foundUser._id },
                {
                    $pull: {
                        products: {
                            product: productId,
                            quantity: quantity,
                            price: foundProduct.productCostBySize[0].price * quantity
                        },
                    },
                },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )
            const totalPrice = updatedCart.products.reduce((acc, p) => acc + p.price, 0)
            updatedCart.bill = totalPrice
            await updatedCart.save()
            res.status(200).json({ message: "Cart has been updated.", payload: updatedCart })
        }
        else {
            throw { message: "You do not have permissions." }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

// Delete cart
const deleteCart = async (req, res) => {
    const decodedToken = res.locals.decodedToken
    const { cartId } = req.params

    try {
        const foundUser = await User.findOne({ _id: decodedToken._id }).populate('purchaseHistory')
        if(!foundUser) throw { message: "User not found." }
        const foundCart = await Cart.findById(cartId)
        if(!foundCart) throw { message: "Cart not found." }

        if(foundUser._id.toString() === foundCart.cartOwner._id.toString()) {
            foundUser.purchaseHistory.push(cartId)
            let deletedCart = await Cart.findByIdAndDelete(cartId)
            if(!deletedCart) throw { message: "No cart with id found." }
            
            const newCart = await new Cart({
                cartOwner: foundUser._id
            })
            await newCart.save()

            foundUser.userCart = newCart._id
            await foundUser.save()
            res.status(200).json({ message: "Old cart was saved in purchase history, cart deleted, and new cart created", user: foundUser, cartDeleted: deletedCart, newCart: newCart })
        }
        else {
            throw { message: "You do not have permissions." }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    deleteCart
}