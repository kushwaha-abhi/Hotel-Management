const express= require("express");
const router= express.Router();
const authMiddleware= require("../middleware/auth.middleware")
const roomController= require('../controllers/room.controller')

router.post('/add', authMiddleware.authUser,roomController.createRoom);
router.delete('/delete/:roomId', authMiddleware.authUser, roomController.deleteRoom);
router.post('/bookroom',authMiddleware.authUser,roomController.bookRoom );
router.get('/getall',authMiddleware.authUser,roomController.getAllRooms);
router.get('/bookings',authMiddleware.authUser,roomController.getAllBookings);

module.exports= router