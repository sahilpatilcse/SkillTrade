const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tradeReqSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    requestType: {
      type: String,
      enum: ["Teach", "Learn", "Exchange"],
    },
    status: {
      type: String,
      enum: ["Accepted", "Pending", "Rejected"],
      default: "Pending"
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("TradeRequest", tradeReqSchema);
