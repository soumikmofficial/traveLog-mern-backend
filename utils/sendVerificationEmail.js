const sendMail = require("./sendMail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const subject = "Verify Email";
  //   FIXME: try putting the origin as env
  const link = `${origin}/verify-email?token=${verificationToken}&email=${email}`;
  const html = `<h3>Welcome ${name}</h3><p>Please click the following link to verify your email : <a href="${link}">Verification Link</a></p>`;
  return sendMail({ to: email, subject, html });
};

module.exports = sendVerificationEmail;
