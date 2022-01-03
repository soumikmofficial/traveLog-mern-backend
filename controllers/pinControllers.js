const { StatusCodes } = require("http-status-codes");
const Pin = require("../models/Pin");

// TODO: GET ALL PINS
const getAllPins = async (req, res) => {
  const pins = await Pin.find({});
  res.status(StatusCodes.OK).json({ msg: "this works" });
};

// TODO: Create Pin
const createPin = async (req, res) => {
  const pin = await Pin.create(req.body);
  res.status(StatusCodes.CREATED).json({ pin });
};

module.exports = { getAllPins, createPin };
