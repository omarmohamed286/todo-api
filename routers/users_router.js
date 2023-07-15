const express = require('express')
const { registerValidator, loginValidator } = require('../helpers/validators')
const { registerService, loginService } = require('../services/auth_service')
const { deleteUser, updateUser, getUser } = require('../services/users_service')
const validateTokenMW = require('../middlewares/validateTokenMW')

const router = express.Router()


router.post('/register', registerValidator, registerService)

    .post('/login', loginValidator, loginService)

    .get('/', validateTokenMW, getUser)

    .delete('/', validateTokenMW, deleteUser)

    .patch('/', validateTokenMW, updateUser)



module.exports = router