// will use this file to fetch-data/talk to server through API present at server
let todo_state = []
function render(todo_state) {
  return todo_state.reduce((acum, obj, index) => {
      return acum += ` <li ${obj.striked ? `class = 'striked'` : '' } data-id = ${index}> ${obj.title} </li>`
  },'')
  
}

function paint() {
  const list = document.getElementById('task-list')
  list.innerHTML = render(todo_state)
}

// fetching all the todos from server- USING IIFE here!!
const serverFetch = function (){
  fetch('api/todos', {
      method : 'GET', 
  })
  .then(response => response.json())
  .then(serverTodos => todo_state = serverTodos)
  .then(paint)
}

serverFetch()

const addTodo = function() {    
  const val = document.getElementsByTagName('input')[0].value;
  if (val == '') return
  document.getElementsByTagName('input')[0].value = ''
  const newTodo = { title : val, striked : false }
  todo_state.push(newTodo)
  paint()

  // send to server to add that newtodo to server todos list using a fetchAPI
  fetch('/api/todos',{
      method : 'POST', 
      body : JSON.stringify(newTodo), // body data type must match "Content-Type" header
      headers: { 'Content-Type': 'application/json',}
  })
}

const toggle = function (e) {
  const idOFPatchedTodo =  e.target.dataset.id
  const id = +idOFPatchedTodo + 1

  // making changes to server
  fetch('/api/todos/' + id, {
      method : 'PATCH', 
      headers : { 'Content-Type' : 'application/json'},
      body : JSON.stringify({
          title: todo_state[idOFPatchedTodo].title,
          striked : !todo_state[idOFPatchedTodo].striked
      })
  })
  .then(response => response.json())
  .then(data => todo_state[idOFPatchedTodo] = data)
  .then(paint)
}

const deleteTodos = function () {
  // Need to send Multiple request to delete multiple todos
  const tobeDeletedTodos = todo_state
    .map((obj, index) => ({...obj, id : index + 1}))
    .filter(obj => obj.striked)
  
  Promise.all(tobeDeletedTodos.map((obj, index) => {
    fetch('api/todos/' + (obj.id - index), {
      method : 'DELETE', 
    })
  }))   
  .then(serverFetch)
}