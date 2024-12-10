const Room = require("../models/room.model");

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
