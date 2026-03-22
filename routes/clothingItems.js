const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

// Get all clothing items
router.get("/", getClothingItems);

// Create a new clothing item
router.post("/", auth, createClothingItem);

// Delete a clothing item by ID
router.delete("/:itemId", auth, deleteClothingItem);

// Like a clothing item
router.put("/:itemId/likes", auth, likeClothingItem);

// Unlike a clothing item
router.delete("/:itemId/likes", auth, unlikeClothingItem);

module.exports = router;
