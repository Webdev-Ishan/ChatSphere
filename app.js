const express = require('express')
const indexRouter= require('./routes/index.js')
const path = require('path')
const app = express()
const http= require('http')
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)


let waitingusers= [] // lis of waitin users
let room = {

}  // name of different rooms

io.on('connection',(socket)=>{

    socket.on('joinroom', ()=>{
        if (waitingusers.length > 0) {
            
            let partner = waitingusers.shift()
            let roomname= `${socket.id}-${partner.id}`

            socket.join(roomname)
            partner.join(roomname)

            io.to(roomname).emit("joined", roomname)
        } else {
            waitingusers.push(socket)
        }
    })

    socket.on('message', (data)=>{
        socket.broadcast.to(data.room).emit("message", data.message);
    })


    
})

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter)

server.listen(3000)