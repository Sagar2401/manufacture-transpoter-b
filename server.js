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
app.use(cors());

app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

http.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
