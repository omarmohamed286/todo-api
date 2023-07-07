require('dotenv').config()
const express = require('express')
require('express-async-errors');
const usersRouter = require('./routers/users_router')
require('./db')
const errHandler = require('./helpers/errHandler')
const todosRouter = require('./routers/todos_router')

const app = express()

const port = process.env.PORT || 8000


app.use(express.json())

app.use('/users', usersRouter)
app.use('/todos', todosRouter)

app.use(errHandler)


app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})