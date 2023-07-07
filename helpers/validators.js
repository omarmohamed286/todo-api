const validatorMW = require('../middlewares/validatorMW')
const { check } = require('express-validator');

const registerValidator = [
    check('username').notEmpty().withMessage('username cannot be null'),
    check('firstName').notEmpty().withMessage('firstName cannot be null'),
    check('password').notEmpty().withMessage('password cannot be null'),
    validatorMW
]

const loginValidator = [
        check('username').notEmpty().withMessage('username cannot be null'),
        check('password').notEmpty().withMessage('password cannot be null'),
        validatorMW
]

module.exports = {
    registerValidator,
    loginValidator
}