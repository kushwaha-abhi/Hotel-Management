const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { fullName, email, password, address, phoneNumber } = req.body;

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

    const token = user.generateAuthToken();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "You are registered successfully",
      token,
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
    });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
