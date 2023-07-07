const { responseError } = require("../config/commonFunction");
const Chat = require("../models/chatModel");

const getAllMyChats = async (req, res) => {
  try {
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate({
        path: "last_message",
        populate: {
          path: "sender",
          select: "-password",
        },
      })
      .sort({ updatedAt: -1 });

    if (chats.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No chats found",
        data: [],
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "All chats",
        data: chats,
      });
    }
  } catch (error) {
    return responseError(res, error);
  }
};

const createChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      is_group_chat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: req.body.userId } } },
      ],
    })
      .populate("users", "-password")
      .populate({
        path: "last_message",
        populate: {
          path: "sender",
          select: "-password",
        },
      });

    if (chat) {
      return res.status(200).json({
        success: false,
        message: "Chat already exists",
        data: chat,
      });
    } else {
      const newChat = new Chat({
        chat_name: `${req.user.first_name} ${req.user.last_name}`,
        is_group_chat: false,
        users: [req.user._id, req.body.userId],
      });

      let savedChat = await newChat.save();

      savedChat = await savedChat.populate("users", "-password");

      savedChat = await savedChat.populate({
        path: "last_message",
        populate: {
          path: "sender",
          select: "-password",
        },
      });

      return res.status(200).json({
        success: true,
        message: "Chat created",
        data: savedChat,
      });
    }
  } catch (error) {
    return responseError(res, error);
  }
};

const groupCreate = async (req, res) => {
  try {
    let users = req.body.users;

    users.push(req.user._id);

    const newGroup = await Chat.create({
      chat_name: req.body.chat_name,
      is_group_chat: true,
      users: users,
      admin: req.user._id,
    });

    let createdGroup = await Chat.findById(newGroup._id)
      .populate("users", "-password")
      .populate("admin", "-password");

    return res.status(200).json({
      success: true,
      message: "Group created",
      data: createdGroup,
    });
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = {
  getAllMyChats,
  createChat,
  groupCreate,
};
