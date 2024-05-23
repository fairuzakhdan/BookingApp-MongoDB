const express = require("express");
const router = express.Router();
const roomController = require("../controllers/rooms");
const validasiObjectId = require("../middlewares/isValidObjectId");
const { verifyAdmin } = require("../middlewares/verifyToken");

router.route("/").get(roomController.getAllRoom);

router.route("/:hotelId").post(verifyAdmin,validasiObjectId, roomController.createNewRoom);

router
  .route("/:roomId")
  .get(validasiObjectId, roomController.getRoomById)
  .put(verifyAdmin, validasiObjectId, roomController.updateNewRoom)

router.put('/availability/:roomId', roomController.updateRoomAvailability)

router.delete('/:hotelId/:roomId', verifyAdmin, validasiObjectId, roomController.deleteRoomById)

module.exports = router;
