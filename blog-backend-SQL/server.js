const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

let users = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    // Set nickname for the connected user
    socket.on('setNickname', (nickname) => {
        socket.nickname = nickname;
        users.push(nickname);
        io.emit('message', `${nickname} has joined the chat`);
        io.emit('users', users); // Update the user list for all clients
    });

    // Broadcast to other users when a new user connects
    socket.broadcast.emit('message', 'A new user has connected');

    // Listen for chat messages
    socket.on('chatMessage', (msg) => {
        // Send the message to everyone except the sender
        socket.broadcast.emit('message', `${socket.nickname}: ${msg}`);
        // Append the message directly to the sender's chat window
        socket.emit('message', `You: ${msg}`);
    });

    // Listen for typing events
    socket.on('typing', () => {
        socket.broadcast.emit('typing', `${socket.nickname} is typing...`);
    });

    // Listen for stop typing events
    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        if (socket.nickname) {
            users = users.filter(user => user !== socket.nickname);
            io.emit('message', `${socket.nickname} has left the chat`);
            io.emit('users', users); // Update the user list for all clients
        }
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
