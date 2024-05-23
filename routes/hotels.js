const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotels");
const validasiObjectId = require("../middlewares/isValidObjectId");
const { verifyAdmin } = require("../middlewares/verifyToken")

router
.route("/")
.get(hotelController.getAllHotel)
.post(verifyAdmin, hotelController.createNewHotel);

router
.route("/:hotelId")
.put(verifyAdmin, validasiObjectId, hotelController.updateNewHotel)
.delete(verifyAdmin, validasiObjectId, hotelController.deleteHotelById);

router.get('/find/:hotelId',validasiObjectId, hotelController.getHotelById);

router.get('/countByCity', verifyAdmin, hotelController.countByCity)
router.get('/countByType', verifyAdmin, hotelController.countByType)
router.get('/rooms/:roomId', verifyAdmin,validasiObjectId, hotelController.getHotelByRoomId);

module.exports = router;
