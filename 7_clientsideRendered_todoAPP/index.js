const express = require('express')
const app = express()
const todoAPI = require('./todoapi')
const hbs = require('hbs')

app.set('views', 'views') // setted by default can change to anything we want
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res, next) => {
  res.render(
    'index',
    {name: 'shaurya'}
  )
})

app.use('/api/todos', todoAPI)

app.listen(8000, (req, res, next) => {
  console.log('Port 8000 Online')
})