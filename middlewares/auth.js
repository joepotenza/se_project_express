const jwt = require("jsonwebtoken");
const { AUTHORIZATION_ERROR } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  // Get token from authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(AUTHORIZATION_ERROR)
      .send({ message: "Invalid authorization" });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload || !payload._id) {
      return res
        .status(AUTHORIZATION_ERROR)
        .send({ message: "Invalid authorization" });
    }

    // User authenticated successfully, update the request with the user data
    req.user = payload;
    next();
  } catch (error) {
    return res
      .status(AUTHORIZATION_ERROR)
      .send({ message: "Invalid authorization" });
  }
};

module.exports = auth;
