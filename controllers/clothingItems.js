const ClothingItem = require("../models/clothingItem");
const {
  INVALID_DATA_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// Get all clothing items
const getClothingItems = (req, res) => {
  try {
    ClothingItem.find()
      .populate("owner")
      .then((items) => {
        if (!items) {
          return res
            .status(NOT_FOUND_ERROR)
            .send({ message: "No clothing items found" });
        }
        return res.send(items);
      })
      .catch((err) => {
        console.error(err);
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      });
  } catch (err) {
    console.error(err);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: "An error has occurred on the server" });
  }
};

// Create a new clothing item
const createClothingItem = (req, res) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id;
    ClothingItem.create({ name, weather, imageUrl, owner })
      .then((item) => res.status(201).send(item))
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          return res
            .status(INVALID_DATA_ERROR)
            .send({ message: "Invalid Data" });
        }
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      });
  } catch (err) {
    console.error(err);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: "An error has occurred on the server" });
  }
};

// Delete a clothing item by ID
const deleteClothingItem = (req, res) => {
  try {
    /*
    Try to find the record by ID and owned by the current logged in user
    This way, we only hit the database twice if the user tried to delete an item they don't own
    */
    ClothingItem.findOneAndDelete({
      _id: req.params.itemId,
      owner: req.user._id,
    })
      .then((item) => {
        if (item) {
          return res.send({ message: "Clothing item deleted successfully" });
        }
        // Item wasn't deleted - check if it exists to return correct error
        ClothingItem.findById(req.params.itemId)
          .then((foundItem) => {
            if (!foundItem) {
              return res
                .status(NOT_FOUND_ERROR)
                .send({ message: "Clothing item not found" });
            }
            // It was found, obviously that means the user didn't own it.
            return res.status(FORBIDDEN_ERROR).send({ message: "Forbidden" });
          })
          .catch((err) => {
            console.error(err);
            if (err.name === "CastError") {
              return res
                .status(INVALID_DATA_ERROR)
                .send({ message: "Invalid Clothing Item ID" });
            }
            return res
              .status(INTERNAL_SERVER_ERROR)
              .send({ message: "An error has occurred on the server" });
          });
      })
      .catch((err) => {
        console.error(err);
        if (err.name === "CastError") {
          return res
            .status(INVALID_DATA_ERROR)
            .send({ message: "Invalid Clothing Item ID" });
        }
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      });
  } catch (err) {
    console.error(err);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: "An error has occurred on the server" });
  }
};

const likeClothingItem = (req, res) => {
  try {
    ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
      .orFail()
      .then((item) => res.send(item))
      .catch((err) => {
        console.error(err);
        if (err.name === "DocumentNotFoundError") {
          return res
            .status(NOT_FOUND_ERROR)
            .send({ message: "Clothing item not found" });
        }
        if (err.name === "CastError") {
          return res
            .status(INVALID_DATA_ERROR)
            .send({ message: "Invalid Clothing Item ID" });
        }
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      });
  } catch (err) {
    console.error(err);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: "An error has occurred on the server" });
  }
};

const unlikeClothingItem = (req, res) => {
  try {
    ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
      .orFail()
      .then((item) => res.send(item))
      .catch((err) => {
        console.error(err);
        if (err.name === "DocumentNotFoundError") {
          return res
            .status(NOT_FOUND_ERROR)
            .send({ message: "Clothing item not found" });
        }
        if (err.name === "CastError") {
          return res
            .status(INVALID_DATA_ERROR)
            .send({ message: "Invalid Clothing Item ID" });
        }
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      });
  } catch (err) {
    console.error(err);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: "An error has occurred on the server" });
  }
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
};
