const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true
    },
    sender: {
      type: String,
      enum: ["user", "ai"], 
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Chat", ChatSchema);
