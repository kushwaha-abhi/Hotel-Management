const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "UnAthorized",
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "UnAthorisezed",
    });
  }
};
