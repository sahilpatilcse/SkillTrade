const User = require("../models/User.js");
const TradeRequest = require("../models/TradeRequest.js");

exports.sendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;

    // Prevent sending request to yourself
    if (senderId === receiverId) {
      return res.status(400).json({
        message: "You cannot send a request to yourself",
      });
    }

    // Prevent duplicate pending requests
    const existingRequest = await TradeRequest.findOne({
      sender: senderId,
      receiver: receiverId,
      status: "Pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Request already sent",
      });
    }

    const newTradeReq = await TradeRequest.create({
      sender: senderId,
      receiver: receiverId,
      message: req.body.message,
      contactEmail: req.body.contactEmail,
      requestType: req.body.requestType,
    });

    res.status(201).json({ newTradeReq });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const myRecRequests = await TradeRequest.find({
      receiver: req.user.id,
    })
      .populate("sender", "-password")
      .sort({ createdAt: -1 });

    res.status(200).json({ myRecRequests });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSentRequests = async (req, res) => {
  try {
    const mySentRequests = await TradeRequest.find({
      sender: req.user.id,
    })
      .populate("receiver", "-password")
      .sort({ createdAt: -1 });

    res.status(200).json({ mySentRequests });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReqStatus = async (req, res) => {
  try {
    const updatedStatus = await TradeRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );

    res.status(201).json({ updatedStatus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
