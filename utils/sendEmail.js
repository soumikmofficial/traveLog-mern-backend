const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendMail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport(nodemailerConfig);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <travelog@gmail.com>',
    to,
    subject,
    html,
  });
};

module.exports = sendMail;
