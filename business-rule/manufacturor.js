const { responseError } = require("../config/commonFunction");
const Manufacturor = require("../models/manufacturor");
const User = require("../models/userModel");

const addManufacturorData = async (req, res) => {
  try {
    const { from, to, quntity, pickup, transporter } = req.body;

    const user = await User.findOne({ _id: transporter });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Transporter found",
        data: null,
      });
    }

    const addData = await Manufacturor.create({
      from,
      to,
      quntity,
      pickup,
      transporter,
      create_by: req.user._id,
    });

    return res.status(201).json({
      status: true,
      message: "Data Added successfully",
      data: {
        order_id: addData._id,
        from: addData.from,
        to: addData.to,
        quntity: addData.quntity,
        pickup: addData.quntity,
      },
    });
  } catch (error) {
    return responseError(res, error);
  }
};

const myManufacturorData = async (req, res) => {
  try {
    const findData = await Manufacturor.find({ created_by: req.user._id });

    if (!findData.lenght) {
      return res.status(400).json({
        status: false,
        message: "Transporter not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "successfully",
      data: findData,
    });
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = { addManufacturorData, myManufacturorData };
