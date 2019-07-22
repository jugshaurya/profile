// Todo API
const express = require('express')
const route = express.Router()

// Maintaing State -> Problem with this type of Approach is : Data is not Persistent if server crashed or shut down, all data will be puffed!
// Solution : Store them into file or Database - Doing files first : inside file_saved_todos.js
const todos = [] 
// for testing Purpose
// [{
//     title: 'code',
//     striked: true
// }]

// Setting body parser to be of encoding-type/Content-type : x-www-form-urlencoded 
route.use(express.urlencoded({extended : true}))


// send all to TODOs to Client 
route.get('/', (req, res, next) => {
  res.send(todos)
})

// Adding a Todo, for Client this is a update operation to add TODO, Hence using POST as Method
route.post('/', (req, res, next) => {
  const { title, striked = false } = req.body
  todos.push({
    title ,
    striked : striked === 'true' 
  })

  res.send(todos[todos.length-1])
})

// Update striked functionality -> we basically set the object given by client ,not only tooggle- beneficial later on, will loook later on
route.patch('/:id', (req, res, next) => {
  // console.log(typeof req.params.id)
  const toBeUpdatedTodo = todos[ (+req.params.id) - 1] // for client 0th todo is 1st todo that's why
  toBeUpdatedTodo.title = req.body.title
  toBeUpdatedTodo.striked = req.body.striked === 'true'
  res.send(toBeUpdatedTodo)
})

route.delete('/:id', (req, res, next) => {
  // of id is invalid as well as todo asked to delete had striked false then return 
  if (+req.params.id <= 0 || +req.params.id > todos.length || todos[+req.params.id - 1].striked === false) return res.sendStatus(403)// forbidden status code
  todos.splice(+req.params.id - 1, 1)
  res.status(200)
  res.send('Deleted! ')
})

module.exports = route
