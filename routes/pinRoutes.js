const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const {
  getAllPins,
  createPin,
  deletePin,
  updatePin,
} = require("../controllers/pinControllers");

router.route("/").get(getAllPins).post(authenticateUser, createPin);
router
  .route("/:id")
  .delete(authenticateUser, deletePin)
  .patch(authenticateUser, updatePin);

module.exports = router;
