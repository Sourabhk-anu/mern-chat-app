const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data')
const connectDb = require('./config/db')
const userRouter = require('./routes/userRoutes')
const chatRouter = require('./routes/chatRoutes')
const messageRouter = require('./routes/messageRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const path = require('path');

const app = express();
app.use(express.json());

dotenv.config();
connectDb();

const PORT = process.env.PORT || 8001;

// app.get('/', (req, res) => {
//     res.send("API is started")
// })

app.use('/api/users', userRouter)
app.use('/api/chats', chatRouter)
app.use('/api/message', messageRouter)

// app.use(express.static(__dirname + '/public'));

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === "development") {
    app.use(express.static(path.join(__dirname1, "/../client/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "client", "build", "index.js"))
    })
} else {
    app.get('/', (req, res) => {
        res.send("API is started")
    })
}

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    }
})

io.on("connection", (socket) => {
    console.log("connected to socket.io")

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    })

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User joined room: ' + room)
    })

    socket.on('typing', (room) => socket.in(room).emit("typing"));
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"));

    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if(!chat.users) return console.log("chat users not defined");

     chat.users.forEach(user => {
        if(user._id == newMessageRecieved.sender._id) return;

        socket.in(user._id).emit("message recieved", newMessageRecieved);
     })   
    })

    socket.off('setup', () => {
        console.log('USER DISCONNECTED');
        socket.leave(userData._id);
    })
})