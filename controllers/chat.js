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
