const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const util = require('util')
const _ = require('lodash');
const CustomError = require('../helpers/customError')


const signJwt = util.promisify(jwt.sign)
const verifyJwt = util.promisify(jwt.verify)


const jwtSecret = process.env.JWT_SECRET
const saltRounds = process.env.saltRounds || 7


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 15
    }
}, {
    toJSON: {
        transform: (doc, ret) => _.omit(ret, ['__v', 'password'])
    }
}
)

userSchema.pre('save', async function () {
    const currentUser = this;
    if (currentUser.isModified('password')) {
        currentUser.password = await bcrypt.hash(currentUser.password, saltRounds)
    }
})

userSchema.statics.hashPassword = async function (plainPassword) {
    return await bcrypt.hash(plainPassword, saltRounds)
}

userSchema.methods.checkPassword = function (plainPassword) {
    const currentUser = this;
    return bcrypt.compare(plainPassword, currentUser.password)
}

userSchema.methods.generateToken = function () {
    const currentUser = this;
    return signJwt({
        id: currentUser.id
    }, jwtSecret)
}

userSchema.statics.getUserByToken = async function (token) {
    const User = this
    try {
        const { id } = await verifyJwt(token, jwtSecret)
        const user = await User.findById(id)
        return user;
    } catch (err) {
        throw new CustomError(err, 401)
    }
}

const User = mongoose.model('User', userSchema)


module.exports = User