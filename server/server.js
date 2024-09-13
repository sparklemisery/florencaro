const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const fs = require("fs");
const https = require("https");
const Caro = require("./model/caroModel");
const User = require("./model/userModel");
const path = require("path");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const caroRoutes = require("./routes/caroRouter");
const { socket_sendMove, checkMatch, finishGame, joinRoom } = require("./controllers/socketController");


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
app.use(cookieParser());

connectDB();

app.use('/api/user', userRoutes);
app.use('/api/caro', caroRoutes);



const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname1, "/my-app/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "my-app", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.send("API is running Successfully");
    });
}

const server = app.listen(PORT, console.log("server start on PORT 6969"));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    }
});


io.on("connection", (socket) => {
    console.log("connected to socket.io ", socket.id);
    socket.on("join game", async (userID, icon) => {
        socket.userId = userID;
        socket.icon = icon;
        socket.join("queue");
        checkMatch(io);

    })
    socket.on('moveAction', async (match_id, vty, vtx, player_id) => {
        socket_sendMove(vty, vtx, match_id, player_id, socket);
    })
    socket.on("leave room", async ({ match_id, message, id_1, id_2 }) => {
        finishGame(match_id, message, id_1, id_2, io, socket);
    })
    socket.on("end game", ({ match_id }) => {
        socket.to(match_id).emit("end game");
    })
    socket.on('join room', async ({ match_id, id1, pass, icon }) => {
        console.log(" nuaw : ", icon)
        joinRoom(match_id, id1, pass, icon, socket, io);

    })


})

