const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const User = require("../models/User");
const crypto = require("crypto");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { uploadAvatar, sendVerificationEmail } = require("../utils");

// TODO: REGISTER
const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  // *uploading the avatar
  if (req.files) {
    const avatarImage = req.files.image;
    if (!avatarImage.mimetype.startsWith("image")) {
      throw new BadRequestError(`File type not supported`);
    }
    const maxSize = 1024 * 1024;
    if (avatarImage.size > maxSize) {
      throw new BadRequestError(`File size too big`);
    }
    const result = await cloudinary.uploader.upload(avatarImage.tempFilePath, {
      folder: "travelog-avatars",
    });
    user.avatar = result.secure_url;
    await user.save();
    fs.unlinkSync(req.files.image.tempFilePath);
  }

  // *send verification mail
  const origin = "http://localhost:3000";
  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email to verify account",
    verificationToken,
  });
};

// TODO: VERIFY EMAIL
const verifyEmail = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "verifyting emai" });
};

// TODO: LOGIN

const login = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "The login page" });
};
const logout = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "The logout page" });
};

module.exports = { register, verifyEmail, login, logout };
