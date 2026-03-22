const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/items", require("./clothingItems"));

const { createUser, loginUser } = require("../controllers/users");

// Create a new user
router.post("/signup", createUser);

// Sign in with email and password
router.post("/signin", loginUser);

module.exports = router;
