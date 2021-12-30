const CustomAPIError = require("./custom-error");
const BadRequestError = require("./bad-request");
const UnauthorizedError = require("./unauthorized");
const NotFoundError = require("./not-found");

module.exports = {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
  UnauthorizedError,
};
