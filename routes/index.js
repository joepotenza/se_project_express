const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/items", require("./clothingItems"));

const { createUser, login } = require("../controllers/users");
const {
  validateUserData,
  validateUserAuthenticationData,
} = require("../middlewares/validation");

// Create a new user
router.post("/signup", validateUserData, createUser);

// Sign in with email and password
router.post("/signin", validateUserAuthenticationData, login);

module.exports = router;
