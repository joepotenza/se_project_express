// NotFoundError
const { NOT_FOUND_ERROR } = require("../utils/errors");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundError;
