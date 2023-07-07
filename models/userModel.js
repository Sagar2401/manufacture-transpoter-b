const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: "String", required: true },
    address: { type: "String", required: true },
    isManufacturor: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
