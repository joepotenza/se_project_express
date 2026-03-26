const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");
const {
  validateClothingItemData,
  validateClothingItemId,
} = require("../middlewares/validation");

// Get all clothing items
router.get("/", getClothingItems);

// Create a new clothing item
router.post("/", auth, validateClothingItemData, createClothingItem);

// Delete a clothing item by ID
router.delete("/:itemId", auth, validateClothingItemId, deleteClothingItem);

// Like a clothing item
router.put("/:itemId/likes", auth, validateClothingItemId, likeClothingItem);

// Unlike a clothing item
router.delete(
  "/:itemId/likes",
  auth,
  validateClothingItemId,
  unlikeClothingItem
);

module.exports = router;
