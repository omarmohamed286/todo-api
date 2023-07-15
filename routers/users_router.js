const express = require('express')
const { registerValidator, loginValidator } = require('../helpers/validators')
const { registerService, loginService } = require('../services/auth_service')
const { getAllUsersService, deleteUser, updateUser } = require('../services/users_service')
const validateTokenMW = require('../middlewares/validateTokenMW')

const router = express.Router()


router.post('/register', registerValidator, registerService)

    .post('/login', loginValidator, loginService)

    .get('/', getAllUsersService)

    .delete('/', validateTokenMW, deleteUser)

    .patch('/', validateTokenMW,updateUser)

module.exports = router