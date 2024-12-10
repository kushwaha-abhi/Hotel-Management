const express= require("express");
const router= express.Router();
const {body}= require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware= require("../middleware/auth.middleware")
router.post('/register',[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:5}).withMessage("password should be minimum 6 figures")
], userController.register)

router.post('/login', [
    body("email").isEmail().withMessage("Invalid email"), 
    body("password").isLength({min:5}).withMessage("password should be minimum 5 figures")
], userController.login);

router.post("/logout", userController.logout);
router.post('/bookroom',authMiddleware.authUser,userController.bookRoom )
module.exports= router;