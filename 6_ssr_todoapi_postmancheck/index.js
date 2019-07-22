const express = require('express')
const app = express()
const todoRoute = require('./file_saved_persisted_todos')

// Problem : app.get() in not working for routers , Why?
app.use('/todos', todoRoute)

app.get('/', (req, res, next) => {
    res.send('OK')
})

// Problem : is it run in Js first Scan ???
app.listen(3000, (req, res, next) => {
    console.log('Listening on Port 3000')
})
