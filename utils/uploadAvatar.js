const cloudinary = require("cloudinary").v2;
const { BadRequestError } = require("../errors");

const uploadAvatar = async ({ imageFile, user }) => {
  const avatarImage = imageFile;
  // check file type
  if (!avatarImage.mimetype.startsWith("image")) {
    throw new BadRequestError(`File type not supported`);
  }

  // check file size
  const maxSize = 1024 * 1024;
  if (avatarImage.size > maxSize) {
    throw new BadRequestError(`File size too big`);
  }
  let avatar_url;
  await cloudinary.uploader.upload(
    avatarImage.tempFilePath,
    { folder: "travelog-avatar" },
    (err, result) => {
      console.log(result);
      avatar_url = result.secure_url;
    }
  );
  user.avatar = avatar_url;
  await user.save();

  fs.unlinkSync(avatarImage.tempFilePath);
};

module.exports = uploadAvatar;
