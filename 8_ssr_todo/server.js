const express = require('express')
const app = require('express')()

app.set('views', './views') // not necessery but using it !
app.set('view engine', 'hbs') 

app.use(express.urlencoded( {extended : true})) // for application/x-www-urlformencoded

let todos = [{
  title : 'code',
  striked: false
},{
  title : 'sleep',
  striked: true
},] 

app.get('/', (req, res, next) => {
  res.render('index',
    {
      name: 'Shaurya',
      todos 
    }
  )
})

app.post('/', (req, res, next) => {
  if (req.body.title === '' ) return res.redirect('/')
  todos.push({
    title: req.body.title ,
    striked : false,
  })
  res.redirect('/') // sending status code 302 (redirection), redirection being set to location in http header
})

app.post('/update/:id', (req, res, next) => {
  const id  = +req.params.id
  todos[id] = {
    title: req.body.title,
    striked : req.body.striked !== 'true'
  }
  res.redirect('/')
})

app.post('/delete', (req, res, next) => {
  todos = todos.filter(obj => !obj.striked)
  res.redirect('/')
})

app.listen('8080', function(){
  console.log('Listening on Port 8080')
})