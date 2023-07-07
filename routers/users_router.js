const express = require('express')
const { registerValidator, loginValidator } = require('../helpers/validators')
const { registerService, loginService } = require('../services/auth_service')
const { getAllUsersService, deleteUser } = require('../services/users_service')


const router = express.Router()


router.post('/register', registerValidator, registerService)

    .post('/login', loginValidator, loginService)

    .get('/', getAllUsersService)

    .delete('/', deleteUser)

module.exports = router