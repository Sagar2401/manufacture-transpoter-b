const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const verifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
          return res.status(401).json({
            status: false,
            message: "invalid token",
          });
        }
        return data;
      });

      if (!decoded || !decoded?.userId) {
        return res.status(401).json({
          status: false,
          message: "invalid token",
        });
      }

      const user = await User.findById(decoded?.userId).select("-password");

      if (!user) {
        return res.status(401).json({
          status: false,
          message: "User not found",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Not authorized, no token found",
      data: null,
    });
  }
};

module.exports = { verifyToken };
