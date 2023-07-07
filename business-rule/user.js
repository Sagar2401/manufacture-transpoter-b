const { responseError } = require("../config/commonFunction");
const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const generateToken = require("../config/generateToken");

const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, isManufacturor, address } =
      req.body;

    const checkUserExist = await User.findOne({ email });

    if (checkUserExist) {
      return res.status(400).json({
        status: false,
        message: "User already exist",
        data: null,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      first_name,
      last_name,
      email,
      address,
      password: hashPassword,
      isManufacturor,
    });

    if (user) {
      const token = generateToken(user._id);
      return res.status(201).json({
        status: true,
        message: "User Register successfully",
        data: {
          token: token,
          first_name: user.first_name,
          last_name: user.last_name,
          isManufacturor: user.isManufacturor,
          email: user.email,
        },
      });
    }

    return res.status(400).json({
      status: false,
      message: "Invalid user data",
      data: null,
    });
  } catch (error) {
    return responseError(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      status: true,
      message: "User login successfully",
      data: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        isManufacturor: user.isManufacturor,
        address: user.address,
        token,
      },
    });
  } catch (error) {
    return responseError(res, error);
  }
};

const listUser = async (req, res) => {
  try {
    if (!req.query.q) {
      return res.status(400).json({
        status: false,
        message: "Please provide search query",
        data: null,
      });
    }
    const query = req.query.q
      ? {
          $or: [
            { first_name: { $regex: req.query.q, $options: "i" } },
            { last_name: { $regex: req.query.q, $options: "i" } },
            { email: req.query.q },
          ],
          $and: [{ _id: { $ne: req.user._id } }],
        }
      : {};

    const user = await User.find(query).select(
      "first_name last_name email avatar"
    );

    if (user.length > 0) {
      return res.status(200).json({
        status: true,
        message: "User list",
        data: user,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No user found",
        data: [],
      });
    }
  } catch (error) {
    return responseError(res, error);
  }
};

const listTransporter = async (req, res) => {
  try {
    const user = await User.find({ isManufacturor: false }).select(
      "first_name last_name email _id"
    );

    if (user.length > 0) {
      return res.status(200).json({
        status: true,
        message: "User list",
        data: user,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No user found",
        data: [],
      });
    }
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = { registerUser, loginUser, listUser, listTransporter };
