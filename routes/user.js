const express = require("express");
const route = express.Router();
const { verifyToken } = require("../middleware/verifyToken");

//import controllers
const userController = require("../controllers/user");

route.post("/register", userController.userRegister);
route.post("/login", userController.userLogin);
route.get("/search", verifyToken, userController.serchUser);
route.get("/all-transpoter", verifyToken, userController.allTransporter);

module.exports = route;
