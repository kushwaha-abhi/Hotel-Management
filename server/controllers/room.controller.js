const Room = require("../models/room.model");
const BookedRoom = require("../models/bookedRoom.model");
const roomModel = require("../models/room.model");

module.exports.createRoom = async (req, res, next) => {
  const { roomNumber, available, roomPrice, bedCount } = req.body;

  // Validate input
  if (!roomNumber || roomPrice === undefined) {
    return res.status(400).json({
      success: false,
      message: "Room number and price are required",
    });
  }

  try {
    // Check if room with the same number already exists
    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: "Room with this number already exists",
      });
    }

    // Create a new room
    const room = new Room({
      roomNumber,
      available: available ?? true, // Default to true if not provided
      roomPrice,
      bedCount,
    });

    await room.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room,
    });
  } catch (error) {
    console.error("Error in createRoom:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// delete a room

module.exports.deleteRoom = async (req, res, next) => {
  const { roomId } = req.params; // Assume roomId is passed as a URL parameter

  if (!roomId) {
    return res.status(400).json({
      success: false,
      message: "Room ID is required",
    });
  }

  try {
    // Find and delete the room by ID
    const deletedRoom = await Room.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
      // data: deletedRoom,
    });
  } catch (error) {
    console.error("Error in deleteRoom:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports.cancelRoom = async (req, res, next) => {
  const { roomNumber } = req.params; // Assume roomId is passed as a URL parameter

  if (!roomNumber) {
    return res.status(400).json({
      success: false,
      message: "Room ID is required",
    });
  }

  try {
    // Find and delete the room by ID
    const cancelRoom = await Room.findOneAndUpdate(
      { roomNumber },
      { $set: { available: true, currentBookingId: null } },
      { new: true }
    );

    if (!cancelRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Room Cancelled",
    });
  } catch (error) {
    console.error("Error in deleteRoom:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Booking room by the user

module.exports.bookRoom = async (req, res) => {
  const {
    roomId,
    name,
    age,
    checkIn,
    checkOut,
    numberOfPeople,
    documentNumber,
    checkInAmount,
    totalAmount,
    paymentMode,
    roomNumber,
    // documentURL,
  } = req.body;

  // Calculate the remaining amount to be paid
  const remainAmount = totalAmount - checkInAmount;

  try {
    // Fetch the room details
    const room = await roomModel.findOne({ roomNumber });
    if (!room || !room.available) {
      return res.status(400).json({
        success: false,
        message: "Room is not available.",
      });
    }

    // Validate the required fields
    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: "Check-in and check-out dates are required.",
      });
    }

    // Calculate the number of days
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after the check-in date.",
      });
    }

    const timeDiff = checkOutDate - checkInDate;
    const numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Validate check-in amount
    if (checkInAmount < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid check-in amount.",
      });
    }

    // Create a new booking
    const bookedRoom = new BookedRoom({
      roomId,
      name,
      age,
      numberOfDays,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      numberOfPeople,
      documentNumber,
      // documentURL,
      checkInAmount,
      totalAmount,
      remainAmount,
      paymentMode,
      roomNumber,
    });

    // Update the room status
    const updatedRoom = await roomModel.findOneAndUpdate(
      { roomNumber },
      { $set: { available: false, currentBookingId: bookedRoom._id } }, // Added `currentBookingId` to link booking
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(400).json({
        success: false,
        message: "Invalid room number provided.",
      });
    }

    // Save the booking to the database
    const savedBooking = await bookedRoom.save();

    res.status(201).json({
      success: true,
      message: "Room booked successfully.",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error booking room:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// find All rooms

module.exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    if (!rooms) {
      res.status(400).json({
        success: false,
        message: "No Rooms",
      });
    }
    res.status(200).json({
      success: true,
      message: "Rooms retrieved successfully",
      data: rooms,
    });
  } catch (error) {
    console.error("Error fetching rooms:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error while retrieving rooms",
    });
  }
};

// get Recipt data

module.exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await BookedRoom.find();

    res.status(200).json({
      success: true,
      message: "Booking details retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching booking details:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error while retrieving booking details",
    });
  }
};

module.exports.cancelBooking = async (req, res, next) => {
  try {
    const { roomNumber } = req.body;

    const updatedRoom = await Room.findOneAndUpdate(
      { roomNumber },
      { $set: { available: false } }
    );

    if (!updatedRoom) {
      res.status(404).json({
        message: "room does not exist with the Id ",
      });
    }
    res.status(200).json({
      success: true,
      message: "Room booking canceled successfully",
      room: updatedRoom,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.checkoutRoom = async (req, res, next) => {
  try {
    const { roomNumber, checkOutAmount } = req.body;

    // Fetch the room to verify it exists and is booked
    const room = await Room.findOne({ roomNumber });
    if (!room || room.available) {
      return res.status(400).json({
        success: false,
        message: "Room is not currently booked or does not exist.",
      });
    }

    // Fetch the associated booking using `currentBookingId`
    const bookedRoom = await BookedRoom.findById(room.currentBookingId);
    if (!bookedRoom) {
      return res.status(404).json({
        success: false,
        message: "No booking found for the given room number.",
      });
    }

    // Validate check-out amount
    if (checkOutAmount < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid check-out amount.",
      });
    }

    // Update booking details and remaining amount
    const updatedBookedRoom = await BookedRoom.findByIdAndUpdate(
      room.currentBookingId,
      {
        $set: { checkOutAmount, status: "Checked Out" }, // Added status for clarity
        $inc: { remainAmount: -checkOutAmount },
      },
      { new: true }
    );

    // Mark room as available and clear `currentBookingId`
    const updatedRoom = await Room.findOneAndUpdate(
      { roomNumber },
      { $set: { available: true, currentBookingId: null } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Checked out successfully.",
      room: updatedRoom,
      booking: updatedBookedRoom,
    });
  } catch (error) {
    console.error("Error during checkout:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports.getBookedRoomData = async (req, res) => {
  try {
    const { roomNumber } = req.params; // Room number passed as a parameter in the URL

    // Validate room number
    if (!roomNumber) {
      return res.status(400).json({
        success: false,
        message: "Room number is required.",
      });
    }

    // Find the room details
    const room = await Room.findOne({ roomNumber });

    // Check if the room exists and is booked
    if (!room || room.available) {
      return res.status(404).json({
        success: false,
        message: "Room is not currently booked or does not exist.",
      });
    }

    // Find the associated booking using the `currentBookingId` field
    const bookedRoom = await BookedRoom.findById(room.currentBookingId);

    if (!bookedRoom) {
      return res.status(404).json({
        success: false,
        message: "No booking found for the given room number.",
      });
    }

    // Return the booked room details
    res.status(200).json({
      success: true,
      message: "Booked room data retrieved successfully.",
      booking: bookedRoom,
    });
  } catch (error) {
    console.error("Error fetching booked room data:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
