const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [50, "name is too long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: [50, "name is too long"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Try a longer password"],
  },

  avatar: {
    type: String,
    url: "/uploads/avatars/default.jpg",
  },

  role: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  passwordToken: String,
  passwordTokenExpirationDate: Date,
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", UserSchema);
