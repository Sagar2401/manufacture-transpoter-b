const express = require("express");
const route = express.Router();

//importing controllers
const manufacturorControllers = require("../controllers/manufacturor");

route.get("/", manufacturorControllers.myManufacturor);
route.post("/add", manufacturorControllers.addData);

module.exports = route;
