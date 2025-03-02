const express = require('express')
const indexRouter= require('./routes/index.js')
const path = require('path')
const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter)

app.listen(3000)