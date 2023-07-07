const { validationResult } = require('express-validator');
const CustomError = require('../helpers/customError')


module.exports = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new CustomError('Validation Error', 422, result.array())
        return next(error)
    }
    next()
}
