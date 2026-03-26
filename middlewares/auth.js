const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { JWT_SECRET } = require("../utils/config");

// TBD: How to integrate error-handler here

const auth = (req, res, next) => {
  // Get token from authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Invalid authorization");
  }
  try {
    const token = authHeader.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload || !payload._id) {
      throw new UnauthorizedError("Invalid authorization");
    }

    // User authenticated successfully, update the request with the user data
    req.user = payload;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      next(new UnauthorizedError("Invalid authorization"));
    } else {
      next(err);
    }
  }
};

module.exports = auth;
