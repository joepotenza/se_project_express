// UnauthorizedError
const { AUTHORIZATION_ERROR } = require("../utils/errors");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTHORIZATION_ERROR;
  }
}

module.exports = UnauthorizedError;
