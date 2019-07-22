// Todo API
const express = require('express')
const route = express.Router()
const fs = require('fs')

route.use(express.urlencoded({extended : true}))

// Helper function to Read to file 
const readTodos = (file, callback) => fs.readFile(file, 'utf-8', (err, data) => {
  if (err) return callback(err)
  // Note : When receiving data from a web server/file, the data is always a string.
  // Parse the data with JSON.parse(), and then data becomes a JavaScript object.
  data = JSON.parse(data) // Now Data is in JSON Format congrats!
  return callback(null, data)
})

// Helper function to Write to file 
const writeTodos = (file, data, callback) => {
  // Note: There are two types of data Storage, editable like DB Storage, and Non-editable Storage like file Storage using here!!
  // Hence We need to read complete data of file, append new data, then write to file this appended/editable data
  // for converting Javascript Object to JSON string is done using JSON.stringify()
  fs.writeFile(file, JSON.stringify(data), (err) => {
    if (err) return callback(err)
    return callback(null)
  })
}

const file = './persisted_todos.json'
// send all to TODOs to Client 
route.get('/', (req, res, next) => {
  readTodos(file, (err, todos) => {
      if (err) return res.send(500) // Server error
      res.send(todos)
  })
})

// Adding a Todo, for Client this is a update operation to add TODO, Hence using POST as Method
route.post('/', (req, res, next) => {
  const { title, striked = false } = req.body
  readTodos(file , (err, data) => {
    data.push({
      title,
      striked: striked === 'true'
    })
    writeTodos(file, data, (err) => {
      if (err) return res.send(500) // Server Error
      res.send(data[data.length-1])
    })
  })
})

// Update striked functionality -> we basically set the object given by client ,not only tooggle- beneficial later on, will loook later on
route.patch('/:id', (req, res, next) => {
  readTodos(file, (err, todos) => {
    if (err) return res.send(500)
    const toBeUpdatedTodo = todos[(+req.params.id) - 1] // for client 0th todo is 1st todo that's why
    toBeUpdatedTodo.title = req.body.title
    toBeUpdatedTodo.striked = req.body.striked === 'true'
    writeTodos(file, todos, (err) =>{
      if (err) return res.send(500)
      res.send(toBeUpdatedTodo)      
    })
  }) 
})

route.delete('/:id', (req, res, next) => {
  readTodos(file, (err, todos) => {
    if (err) return res.send(500)
    if (+req.params.id <= 0 || +req.params.id > todos.length || todos[+req.params.id - 1].striked === false) {
      return res.sendStatus(403) // forbidden status code
    }
    todos.splice(+req.params.id - 1, 1)
    writeTodos(file, todos, (err) => {
      if (err) return res.send(500)
      res.status(200)
      res.send('Deleted!')
    })
  })
})

module.exports = route
