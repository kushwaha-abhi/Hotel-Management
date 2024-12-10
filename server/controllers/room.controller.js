const Room = require("../models/room.model");
const BookedRoom = require("../models/bookedRoom.model");
module.exports.createRoom = async (req, res, next) => {
  const { roomNumber, available, roomPrice } = req.body;

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

// Booking room by the user

module.exports.bookRoom = async (req, res) => {
  upload.single("document")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    const {
      name,
      age,
      checkIn,
      checkOut,
      numberOfPeople,
      documentNumber,
      amount,
      paymentMode,
      roomNumber,
    } = req.body;

    const documentURL = req.file ? `/uploads/${req.file.filename}` : null; // Save file path

    try {
      const room = await roomModel.findOne({ roomNumber });
      if (!room || !room.available) {
        return res.status(400).json({
          success: false,
          message: "Room is not available",
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

      // Create a new booking
      const bookedRoom = new BookedRoom({
        name,
        age,
        numberOfDays,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        numberOfPeople,
        documentNumber,
        documentURL,
        amount,
        paymentMode,
        roomNumber,
      });

      // Update the room status
      const updatedRoom = await roomModel.findOneAndUpdate(
        { roomNumber },
        { $set: { available: false } }
      );

      if (!updatedRoom) {
        return res.status(400).json({
          success: false,
          message: "You have entered the wrong room number",
        });
      }

      // Save the booking to the database
      const savedBooking = await bookedRoom.save();

      res.status(201).json({
        success: true,
        message: "Room booked successfully",
        booking: savedBooking,
      });
    } catch (error) {
      console.error("Error booking room:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  });
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
    const bookings = await BookedRoom.find(
      {},
      {
        name: 1,
        roomNumber: 1,
        numberOfPeople: 1,
        amount: 1,
        paymentMode: 1,
        date: 1,
        numberOfDays: 1,
        _id: 0,
      }
    );

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
