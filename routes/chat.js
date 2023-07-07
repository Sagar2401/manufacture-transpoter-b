const express = require("express");
const route = express.Router();

//importing controllers
const chatControllers = require("../controllers/chat");

route.get("/", chatControllers.getMyChats);
route.post("/create", chatControllers.createNewChat);
route.post("/createGroup", chatControllers.createNewGroup);

module.exports = route;
