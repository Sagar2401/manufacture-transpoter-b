const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const http = require("http").createServer(app);

const dbConnection = require("./config/dbConnection");

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

dbConnection();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: (_origin, callback) => {
      callback(null, true);
    },
  })
);
app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

http.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    console.log(sendUserSocket);

    if (sendUserSocket) {
      socket
        .to(sendUserSocket)
        .emit("msg-recieve", { messages: data.messages, time: new Date() });
    }
  });
});
