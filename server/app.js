const express = require("express");
const dotenv = require("dotenv").config();
const connectToBb = require("./db/database");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const roomRoutes = require("./routes/room.routes");
const cloudinary = require("cloudinary").v2;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: "dav7trp4i",
  api_key: "343991673178556",
  api_secret: "hO22EEIBUVazO_RHQbfm2FQpH1k", // Click 'View API Keys' above to copy your API secret
});

connectToBb();

app.get("/", (req, res) => {
  res.send("everything is working fine");
});

app.use("/user", userRoutes);
app.use("/room", roomRoutes);

module.exports = app;
