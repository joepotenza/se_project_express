const { INTERNAL_SERVER_ERROR } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  // if an error has no status, set it to 500
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    // check the status and display a message based on it
    message:
      statusCode === INTERNAL_SERVER_ERROR
        ? "An error occurred on the server"
        : message,
  });
};
module.exports = errorHandler;
