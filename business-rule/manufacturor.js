const { responseError } = require("../config/commonFunction");
const Manufacturor = require("../models/manufacturor");
const User = require("../models/userModel");

const addManufacturorData = async (req, res) => {
  try {
    const { from, to, quantity, pickup, transporter } = req.body;

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
      quantity,
      pickup,
      transporter,
      created_by: req.user._id,
    });

    return res.status(201).json({
      status: true,
      message: "Data Added successfully",
      data: {
        order_id: addData._id,
        from: addData.from,
        to: addData.to,
        quantity: addData.quantity,
        pickup: addData.quantity,
      },
    });
  } catch (error) {
    return responseError(res, error);
  }
};
const updatePriceOfOrder = async (req, res) => {
  try {
    const { order_id, price } = req.body;

    const findOrder = await Manufacturor.findOne({ _id: order_id });
    console.log("dfsdf", findOrder);
    if (!findOrder) {
      return res.status(400).json({
        status: false,
        message: "order not found",
        data: null,
      });
    }
    console.log("dfsdf", findOrder.transporter.toString(), req.user._id);
    if (findOrder.transporter.toString() !== req.user._id.toString()) {
      return res.status(400).json({
        status: false,
        message: "you can only update price of your request",
        data: null,
      });
    }

    const updateData = await Manufacturor.findOneAndUpdate(
      { _id: order_id },
      { price },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Price Updated Successfully",
      data: updateData,
    });
  } catch (error) {
    return responseError(res, error);
  }
};

const myManufacturorData = async (req, res) => {
  try {
    let findData;

    if (req.user.isManufacturor) {
      findData = await Manufacturor.find({ created_by: req.user._id });
    } else {
      findData = await Manufacturor.find({ transporter: req.user._id });
    }

    console.log(findData);
    if (!findData.length) {
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

const allOrderRequest = async (req, res) => {
  try {
    const findData = await Manufacturor.find({ transporter: req.user._id });

    if (!findData.length) {
      return res.status(400).json({
        status: false,
        message: "no orders found",
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

module.exports = {
  addManufacturorData,
  myManufacturorData,
  updatePriceOfOrder,
  allOrderRequest,
};
