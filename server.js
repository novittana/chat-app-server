const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const socket = require("socket.io");
const contactsRoute = require("./routes/contactsRoute");
const conversationsRoute = require("./routes/conversationsRoute");
const messagesRoute = require("./routes/messagesRoutes");
const groupsRoute = require("./routes/groupsRoute")

const app = express();
require("dotenv").config();


app.use(cors());
app.use(express.json());

const {MONGO_URL, PORT} = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connection successful");
})
    .catch((err) => {
        console.log(err.message);
    });

app.use("/api/auth", userRoutes)
app.use("/api/contacts", contactsRoute)
app.use("/api/conversations", conversationsRoute)
app.use("/api/messages", messagesRoute)
app.use("/api/groups", groupsRoute)


const server = app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`)
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
    users.push({userId, socketId})
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
//         credentials: true,
    }
});
//
// global.onlineUsers = new Map();
io.on("connection", (socket) => {
    console.log("a user connected")
    //take userId and socketId from user
    // io.emit("welcome", "hello this is socket server")
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users)
    });

    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        })
    })

    socket.on("disconnect", () => {
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })

//     global.chatSocket = socket;
//     socket.on("add-user", (userId) => {
//         onlineUsers.set(userId, socket.id);
//     });
//     socket.on("send-msg", (data)=>{
//         const sendUserSocket = onlineUsers.get(data.to);
//         if(sendUserSocket){
//             socket.to(sendUserSocket).emit("msg-recieve", data.message)
//         }
//     })
})