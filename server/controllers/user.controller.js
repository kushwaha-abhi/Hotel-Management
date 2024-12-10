const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const BookedRoom = require("../models/bookedRoom.model");
const roomModel= require("../models/room.model")
const multer = require("multer");
const { upload } = require('../uploads/multerConfig');

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { fullName, email, password, address, phoneNumber } = req.body;
  console.log(fullName, email, password, address, phoneNumber);
  // Check if required fields are provided
  if (!fullName || !email || !password || !phoneNumber || !address) {
    return res.status(400).json({
      success: false,
      message: "All fields are required (fullname, email, and password)",
    });
  }

  try {
    // Check if the user already exists
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
    });

    // Generate authentication token
    const token = user.generateAuthToken();
    res.cookie("token", token);
    // Respond with success
    res.status(201).json({
      success: true,
      message: "You are registered",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Longin Route
module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  // Check if required fields are provided
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate authentication token
    const token = user.generateAuthToken();
    res.cookie("token", token);
    // Respond with success
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Logout

module.exports.logout = async (req, res, next) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error in logout:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Booking room by the user

module.exports.bookRoom = async (req, res) => {
  const {
    name,
    age,
    checkIn,
    checkOut,
    numberOfPeople,
    documentNumber,
    documentURL,
    amount,
    paymentMode,
    roomNumber,
  } = req.body;

  try {
    const room = roomModel.findOne({ roomNumber });
    if (!room.available) {
      res.status(400).json({
        message: "room is not available",
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

    const timeDiff = checkOutDate - checkInDate; // Difference in milliseconds
    const numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

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

    const updatedroom = await roomModel.findOneAndUpdate(
      { roomNumber },
      { $set: { available: false } }
    );

    if (!updatedroom) {
      return res.status(400).json({
        success: false,
        message: "You have entered the wrong room number",
      });
    }
    await room.save();
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
};
