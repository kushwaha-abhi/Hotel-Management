const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength: [3, "First name should be at least 3 characters"],
  },

  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Email should be at least 5 characters"],
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
  address: {
    type: String,
    required: true,
  },
  document: {
    documentType: {
      type: String,
      default: "Adhaar",
    },
    documentNumber: {
      type: Number,
    },
    documentURL: {
      type: String,
    },
  },
});

userModel.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

module.exports = mongoose.model("User", userModel);
