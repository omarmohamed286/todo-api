const User = require('../models/user_model')
const CustomError = require('../helpers/customError')


const getAllUsersService = async (req, res) => {
    const allUsers = await User.find({}, 'firstName -_id')
    res.json(allUsers)
}


const deleteUser = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) throw new CustomError('Authorization required', 401)
    const user = await User.getUserByToken(token)
    await User.findByIdAndRemove(user.id)
    res.json({
        message: 'User deleted succefully'
    })
}

module.exports = {
    getAllUsersService,
    deleteUser
}