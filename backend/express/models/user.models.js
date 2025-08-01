const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    phone: {
      type: String,
      required: true,
      minlength: 11
    },
    gender: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
