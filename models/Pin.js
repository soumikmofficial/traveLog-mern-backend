const mongoose = require("mongoose");
const PinSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: [50, "Title cannot exceed 50 characters"],
    },
    title: {
      type: String,
      required: true,
      maxLength: [50, "Title cannot exceed 50 characters"],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
