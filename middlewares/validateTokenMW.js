const CustomError = require('../helpers/customError');


module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) throw new CustomError('Authorization required', 401)
    next()
}