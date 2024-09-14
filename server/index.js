const express = require('express')
// const cors = require('cors')
const {createServer} = require('http')
const {Server} = require('socket.io')

const app=express()

// app.use(cors())
const httpServer = createServer(app)

const io = new Server(httpServer,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
})

io.on('connection',(socket)=>{
    socket.on('new-user',(data)=>{
        console.log(data)
        socket.broadcast.emit('new-user-joined',data)
    })
    socket.on('beginPath',(data)=>{
        // console.log(data)
        socket.broadcast.emit('beginPath',data)
    })
    socket.on('drawLine',(data)=>{
        // console.log(data)
        socket.broadcast.emit('drawLine',data)
    })
    socket.on('changeConfig',(data)=>{
        // console.log('hi')
        // console.log(data)
        socket.broadcast.emit('changeConfig',data)
    })
})

httpServer.listen(5500,()=>{
    console.log('Server is running on port 5500')
})