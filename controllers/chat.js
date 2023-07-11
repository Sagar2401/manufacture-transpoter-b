//---------------------------------------------------------------------------------
const Messages = require("../models/messageModel");
const Manufacturor = require("../models/manufacturor");
const { responseError } = require("../config/commonFunction");
module.exports.getMessages = async (req, res, next) => {
  try {
    const { order_id } = req.body;

    const findOrder = await Manufacturor.findOne({ _id: order_id });

    if (!findOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const messages = await Messages.find({ order_id }).sort({ updatedAt: 1 });
    console.log(messages[0].sender, req.user);

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === req.user._id.toString(),
        message: msg.message.text,
        time: msg.createdAt,
      };
    });

    return res.status(200).json({
      status: true,
      message: "Price Updated Successfully",
      data: projectedMessages,
    });
  } catch (ex) {
    return responseError(res, ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { order_id, message } = req.body;

    const findOrder = await Manufacturor.findOne({ _id: order_id });

    console.log(findOrder);
    if (!findOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const data = await Messages.create({
      message: { text: message },
      users: [findOrder.created_by, findOrder.transporter],
      order_id,
      sender: req.user._id,
    });

    if (data)
      return res.status(200).json({
        status: true,
        message: "Price Updated Successfully",
        data: data,
      });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    console.log(ex);
    return responseError(res, ex);
  }
};
