const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chat_name: { type: String, required: true, trim: true },
    is_group_chat: { type: Boolean, required: true, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    last_message: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
