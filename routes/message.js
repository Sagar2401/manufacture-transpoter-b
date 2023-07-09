// const express = require("express");
// const route = express.Router();

// // Import the controller
// // const messageController = require("../controllers/message");

// route.get("/", (req, res) => {
//   res.send("Hello World from message.js");
// });

// module.exports = route;
const { addMessage, getMessages } = require("../controllers/chat");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);

module.exports = router;
