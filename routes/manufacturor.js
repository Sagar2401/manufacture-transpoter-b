const express = require("express");
const route = express.Router();

//importing controllers
const manufacturorControllers = require("../controllers/manufacturor");

route.get("/", manufacturorControllers.myManufacturor);
route.post("/add", manufacturorControllers.addData);
route.post("/updatePrice", manufacturorControllers.updatePrice);
route.post(
  "/allRequest",
  manufacturorControllers.allOrderRequestFortransporter
);

module.exports = route;
