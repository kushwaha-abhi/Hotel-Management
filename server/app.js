const express= require("express");
const dotenv= require('dotenv').config();
const connectToBb= require("./db/database")
const app= express();
const cors= require('cors');
const cookieParser= require('cookie-parser');
const userRoutes= require("./routes/user.routes")
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToBb();
app.get("/", (req,res)=>{
    res.send("everything is working fine");
})

app.use("/user",userRoutes);
module.exports=app;