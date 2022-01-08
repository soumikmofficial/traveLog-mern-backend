const express = require("express");
const router = express.Router();

const {
  getAllPins,
  createPin,
  deletePin,
} = require("../controllers/pinControllers");

router.route("/").get(getAllPins).post(createPin);
router.route("/:id").delete(deletePin);

module.exports = router;
