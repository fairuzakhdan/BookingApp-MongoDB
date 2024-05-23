const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const isValidObjectId = require("../middlewares/isValidObjectId");
const {verifyUser, verifyAdmin} = require('../middlewares/verifyToken');

router.route("/").get(verifyAdmin, userController.getAllUser);

router
  .route("/:id")
  .get(verifyUser,isValidObjectId, userController.getUserById)
  .patch(verifyUser,isValidObjectId, userController.updateUserById)
  .delete(verifyUser, isValidObjectId, userController.deleteUserById)
module.exports = router;
