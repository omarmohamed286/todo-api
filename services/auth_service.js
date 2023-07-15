const User = require('../models/user_model')
const CustomError = require('../helpers/customError')


const registerService = async (req, res) => {
    const { username, password, firstName } = req.body;
    const user = await User.findOne({ username: username })
    if (user) throw new CustomError(`user with username: ${user.username} is registered already`, 401)
    const createdUser = new User({
        username: username,
        password: password,
        firstName: firstName
    })
    await createdUser.save()
    res.json({
        message: 'user was registered succefully',
        user: createdUser.username
    })
}

const loginService = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        username: username
    })
    if (!user) throw new CustomError('Wrong username or password', 401)
    const isMatch = await user.checkPassword(password)
    if (isMatch) {
        const token = await user.generateToken()
        res.json({ message: 'loged in succefully', username, token })
    }
    else {
        res.json({ message: 'wrong password' })
    }
}

module.exports = {
    registerService,
    loginService
}