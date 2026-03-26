// BadRequestError
const { INVALID_DATA_ERROR } = require("../utils/errors");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INVALID_DATA_ERROR;
  }
}

module.exports = BadRequestError;
