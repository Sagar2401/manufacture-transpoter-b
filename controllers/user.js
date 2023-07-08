const joi = require("joi");
const { responseError } = require("../config/commonFunction");
const {
  registerUser,
  loginUser,
  listUser,
  listTransporter,
} = require("../business-rule/user");

const userRegister = async (req, res) => {
  try {
    const validateBody = joi.object({
      first_name: joi.string().required().min(3).max(50),
      last_name: joi.string().required().min(3).max(50),
      address: joi.string().required(),
      email: joi.string().required().email(),
      password: joi.string().required().min(4).max(30),
      isManufacturor: joi.boolean().required(),
    });

    const validate = validateBody.validate(req.body);

    if (validate.error) {
      return res.status(400).json({
        status: false,
        message: validate.error.details[0].message,
      });
    }

    return await registerUser(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

const userLogin = async (req, res) => {
  try {
    const validateBody = joi.object({
      email: joi.string().required().email(),
      password: joi.string().required(),
    });

    const validate = validateBody.validate(req.body);

    if (validate.error) {
      return res.status(400).json({
        status: false,
        message: validate.error.details[0].message,
      });
    }

    return await loginUser(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

const serchUser = async (req, res) => {
  try {
    return await listUser(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

const allTransporter = async (req, res) => {
  try {
    return await listTransporter(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = { userRegister, userLogin, serchUser, allTransporter };
