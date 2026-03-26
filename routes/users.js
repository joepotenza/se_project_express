const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateUserDataForUpdate } = require("../middlewares/validation");
const { getCurrentUser, updateUserInfo } = require("../controllers/users");

// Get the current user
router.get("/me", auth, getCurrentUser);

// Update the current user's profile
router.patch("/me", auth, validateUserDataForUpdate, updateUserInfo);

module.exports = router;
