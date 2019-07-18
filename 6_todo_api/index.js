const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
    res.send('OK')
})

app.listen(3000, (req, res, next) => {
    console.log('Listening on Port 3000')
})
