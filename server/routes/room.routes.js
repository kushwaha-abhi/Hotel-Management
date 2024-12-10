const express= require("express");
const router= express.Router();
const authMiddleware= require("../middleware/auth.middleware")
const roomController= require('../controllers/room.controller')

router.post('/add', authMiddleware.authUser,roomController.createRoom);
router.delete('/delete/:roomId', authMiddleware.authUser, roomController.deleteRoom);
module.exports= router