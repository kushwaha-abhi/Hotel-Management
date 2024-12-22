const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
    bedCount: {
      type: Number,
      // required:true,
      min: 1,
    },
    roomPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    currentBookingId: {
      type: mongoose.Schema.ObjectId,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
