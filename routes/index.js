const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");

//import all the routes
const message = require("./message");
const user = require("./user");
const manufacturor = require("./manufacturor");

router.use("/user", user);

router.use(verifyToken);

router.use("/manufacturor", manufacturor);

router.use("/message", message);

module.exports = router;
