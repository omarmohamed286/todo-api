const mongoose = require('mongoose')
const _ = require('lodash');


const todoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    createdAt: String
}, {
    toJSON: {
        transform: (doc, ret) => _.omit(ret, ['__v'])
    }
})



const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo