const express = require('express')
const router = express.Router()
const { createUser, getAllUsers, getCurrentUser, userLogin, updateUser, updatePassword, deleteUser } = require('./controller/userController')
const { checkIsEmpty, validateCreateUser, jwtMiddleware, validateLogin, validateUpdateUser, validateUpdatePassword } = require('../validator/lib/index')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Hello World from userRouter!')
})

router.post('/create-user', checkIsEmpty, validateCreateUser, createUser)
router.get('/all-users', getAllUsers)
router.post('/login', checkIsEmpty, validateLogin, userLogin)
router.get('/current-user', jwtMiddleware, getCurrentUser)
router.put('/update-user', checkIsEmpty, validateUpdateUser, jwtMiddleware, updateUser)
router.put('/update-password', checkIsEmpty, validateUpdatePassword, jwtMiddleware, updatePassword)
router.delete('/delete-user/:id', deleteUser)

module.exports = router