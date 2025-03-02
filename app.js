const express = require('express')
const indexRouter= require('./routes/index.js')
const path = require('path')
const app = express()
const http= require('http')
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

io.on('connection',(socket)=>{
    console.log('connected');
})

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter)

server.listen(3000)