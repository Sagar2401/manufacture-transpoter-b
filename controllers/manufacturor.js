const joi = require("joi");
const { responseError } = require("../config/commonFunction");
const {
  addManufacturorData,
  myManufacturorData,
  updatePriceOfOrder,
} = require("../business-rule/manufacturor");

const addData = async (req, res) => {
  try {
    const validateBody = joi.object({
      from: joi.string().required(),
      to: joi.string().required(),
      quantity: joi.string().required(),
      pickup: joi.string().required(),
      transporter: joi.allow(),
    });

    const validate = validateBody.validate(req.body);

    if (validate.error) {
      return res.status(400).json({
        status: false,
        message: validate.error.details[0].message,
      });
    }

    return await addManufacturorData(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

const myManufacturor = async (req, res) => {
  try {
    return await myManufacturorData(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

const allOrderRequestFortransporter = async (req, res) => {
  try {
    return await myManufacturorData(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

const updatePrice = async (req, res) => {
  try {
    const validateBody = joi.object({
      order_id: joi.string().required(),
      price: joi.number().required().min(0),
    });

    const validate = validateBody.validate(req.body);
    if (validate.error) {
      return res.status(400).json({
        status: false,
        message: validate.error.details[0].message,
      });
    }
    return await updatePriceOfOrder(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = {
  addData,
  myManufacturor,
  updatePrice,
  allOrderRequestFortransporter,
};
