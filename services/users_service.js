const User = require('../models/user_model')

const getUser = async (req, res) => {
    const token = req.headers.authorization;
    const user = await User.getUserByToken(token)
    res.json(user)
}

const deleteUser = async (req, res) => {
    const token = req.headers.authorization;
    const user = await User.getUserByToken(token)
    await User.findByIdAndRemove(user.id)
    res.json({
        message: 'User deleted succefully'
    })
}

const updateUser = async (req, res) => {
    const token = req.headers.authorization;
    const user = await User.getUserByToken(token)
    if (req.body.username) {
        await User.findByIdAndUpdate(user.id, {
            username: req.body.username
        })
        res.json({
            message: 'User updated succefully'
        })
    }
    if (req.body.firstName) {
        await User.findByIdAndUpdate(user.id, {
            firstName: req.body.firstName
        })
        res.json({
            message: 'User updated succefully'
        })
    }
    if (req.body.password) {
        const hashedPassword = await User.hashPassword(req.body.password)
        await User.findByIdAndUpdate(user.id, {
            password: hashedPassword
        })
        res.json({
            message: 'User updated succefully'
        })
    }
}

module.exports = {
    deleteUser,
    updateUser,
    getUser
}