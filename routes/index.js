const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/items", require("./clothingItems"));

const { createUser, login } = require("../controllers/users");

// Create a new user
router.post("/signup", createUser);

// Sign in with email and password
router.post("/signin", login);

module.exports = router;
