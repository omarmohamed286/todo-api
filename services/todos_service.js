const User = require('../models/user_model')
const Todo = require('../models/todo_model')
const CustomError = require('../helpers/customError');
const mongoose = require('mongoose')

const addTodo = async (req, res) => {
    const token = req.headers.authorization;
    const user = await User.getUserByToken(token)
    const { title } = req.body
    const todo = new Todo({
        userId: user.id,
        title: title,
        createdAt: new Date()
    })
    await todo.save()
    res.json({
        message: 'Todo added succefully'
    })
}

const getUserTodos = async (req, res) => {
    const token = req.headers.authorization;
    const user = await User.getUserByToken(token)
    const todos = await Todo.find({
        userId: user.id
    })
    res.json(todos)
}

const updateTodo = async (req, res) => {
    const newTitle = req.body.newTitle
    const todoId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(todoId)) throw new CustomError('Invalid todoId', 404)
    const result = await Todo.findByIdAndUpdate(todoId, {
        title: newTitle
    })
    if (!result) throw new CustomError('Error occurred, maybe wrong todoId', 404)
    res.json({
        message: 'Todo updated succefully'
    })
}


const deleteTodo = async (req, res) => {
    const todoId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(todoId)) throw new CustomError('Invalid todoId', 404)
    const result = await Todo.findByIdAndRemove(todoId)
    if (!result) throw new CustomError('Error occurred, maybe wrong todoId', 404)
    res.json({
        message: 'Todo deleted succefully'
    })
}

module.exports = {
    addTodo,
    getUserTodos,
    updateTodo,
    deleteTodo
}