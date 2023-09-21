
const express = require("express");

const app = express();

const http = require('http');

//Combination of express and http
const server = http.createServer(app);
//Getting server from socket.io
const {Server} = require('socket.io');
//Creating io instance from Server
const io = new Server(server);
const PORT = 5000;

io.on("connection", (socket)=>{
    socket.on("user-message",(userData)=>{
        io.emit("user-message",userData);
    })
})

//Creating a static rout
app.use(express.static('Public'));
server.listen(PORT);

// http://localhost:5000/