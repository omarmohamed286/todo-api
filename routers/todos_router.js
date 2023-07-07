const express = require('express')
const { addTodo, getUserTodos, updateTodo, deleteTodo } = require('../services/todos_service')
const { todoValidator } = require('../helpers/validators')
const validateTokenMW = require('../middlewares/validateTokenMW')


const router = express.Router()


router.post('/', validateTokenMW, addTodo)

    .get('/', validateTokenMW, getUserTodos)

    .patch('/:id', [validateTokenMW, todoValidator], updateTodo)

    .delete('/:id', validateTokenMW, deleteTodo)


module.exports = router