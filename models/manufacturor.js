const mongoose = require("mongoose");

const manufacturorSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    quntity: Number,
    price: Number,
    pickup: String,
    transporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Manufacturor = mongoose.model("manufacturor", manufacturorSchema);
module.exports = Manufacturor;
