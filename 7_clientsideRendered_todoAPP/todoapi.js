// server Todo API
const express = require('express')
const route = express.Router()
const todos = [{
    title : 'code',
    striked: false
},{
    title : 'sleep',
    striked: true
},] 

// route.use(express.urlencoded({extended : true}))
route.use(express.json())

route.get('/', (req, res, next) => {
  res.send(todos)
})

route.post('/', (req, res, next) => {
//   console.log(req.body)
//   console.log(JSON.parse(req.body))

  const { title, striked = false } = req.body
  todos.push({
    title ,
    striked : striked === 'true' 
  })

  res.send(todos[todos.length-1])
})

route.patch('/:id', (req, res, next) => {
  const toBeUpdatedTodo = todos[ (+req.params.id) - 1] 
  toBeUpdatedTodo.title = req.body.title
  toBeUpdatedTodo.striked = req.body.striked
  // req.body.striked is guranted to be boolean here
  res.send(toBeUpdatedTodo)
})

route.delete('/:id', (req, res, next) => {
  todos.splice(+req.params.id - 1, 1)
  res.status(200)
  res.send('Deleted!')
})

module.exports = route
