const joi = require("joi");
const { responseError } = require("../config/commonFunction");
const {
  getAllMyChats,
  createChat,
  groupCreate,
} = require("../business-rule/chat");

const getMyChats = async (req, res) => {
  try {
    return await getAllMyChats(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

const createNewChat = async (req, res) => {
  try {
    const validateBody = joi.object({
      userId: joi.required(),
    });

    const validate = validateBody.validate(req.body);

    if (validate.error) {
      return res.status(400).json({
        status: false,
        message: validate.error.details[0].message,
      });
    }

    return await createChat(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

const createNewGroup = async (req, res) => {
  try {
    const validateBody = joi.object({
      chat_name: joi.string().required().min(2).max(50),
      users: joi.array().required().min(2),
    });

    const validate = validateBody.validate(req.body);

    if (validate.error) {
      return res.status(400).json({
        status: false,
        message: validate.error.details[0].message,
      });
    }

    return await groupCreate(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = { getMyChats, createNewChat, createNewGroup };

//---------------------------------------------------------------------------------
const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    console.log(req.body);
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
