const { StatusCodes } = require("http-status-codes");
const Pin = require("../models/Pin");
const CustomError = require("../errors");

// TODO: GET ALL PINS
const getAllPins = async (req, res) => {
  const pins = await Pin.find({});
  res.status(StatusCodes.OK).json({ count: pins.length, pins });
};

// TODO: Create Pin
const createPin = async (req, res) => {
  const pin = await Pin.create(req.body);
  res.status(StatusCodes.CREATED).json({ pin });
};
// TODO: Delete Pin
const deletePin = async (req, res) => {
  const pin = await Pin.findOne({
    _id: req.params.id,
    username: req.user.username,
  });
  if (!pin) {
    throw new CustomError.BadRequestError(
      `No pin with the id of ${req.params.id}`
    );
  }
  await pin.remove();
  res.status(StatusCodes.CREATED).json({ msg: `pin removed successfully` });
};

module.exports = { getAllPins, createPin, deletePin };
