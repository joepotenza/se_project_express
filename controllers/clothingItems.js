const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

// GET /items -- Get all clothing items
const getClothingItems = (req, res, next) => {
  try {
    ClothingItem.find()
      .then((items) => {
        if (!items) {
          // Return an empty array if no items
          return res.send([]);
        }
        return res.send(items);
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

// POST /items -- Create a new clothing item
const createClothingItem = (req, res, next) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id;
    ClothingItem.create({ name, weather, imageUrl, owner })
      .then((item) => res.status(201).send(item))
      .catch((err) => {
        if (err.name === "ValidationError") {
          next(new BadRequestError("Invalid Data"));
        } else {
          next(err);
        }
      });
  } catch (err) {
    next(err);
  }
};

// DELETE /items/:itemId -- Delete a clothing item by ID
const deleteClothingItem = (req, res, next) => {
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
              throw new NotFoundError("Clothing item not found");
            }
            // It was found, obviously that means the user didn't own it.
            throw new ForbiddenError("Forbidden");
          })
          .catch(next); // Send caught error to error handler middleware
      })
      .catch((err) => {
        if (err.name === "CastError") {
          // validation middleware should catch this but just in case
          next(new BadRequestError("Invalid Clothing Item ID"));
        } else {
          next(err);
        }
      });
  } catch (err) {
    next(err);
  }
};

// PUT /items/:itemId/likes -- Like a clothing item
const likeClothingItem = (req, res, next) => {
  try {
    ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
      .orFail()
      .then((item) => res.send(item))
      .catch((err) => {
        if (err.name === "DocumentNotFoundError") {
          next(new NotFoundError("Clothing item not found"));
        } else if (err.name === "CastError") {
          // validation middleware should catch this but just in case
          next(new BadRequestError("Invalid Clothing Item ID"));
        } else {
          next(err);
        }
      });
  } catch (err) {
    next(err);
  }
};

// DELETE /items/:itemId/likes -- Un-like a clothing item
const unlikeClothingItem = (req, res, next) => {
  try {
    ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
      .orFail()
      .then((item) => res.send(item))
      .catch((err) => {
        if (err.name === "DocumentNotFoundError") {
          next(new NotFoundError("Clothing item not found"));
        } else if (err.name === "CastError") {
          next(new BadRequestError("Invalid Clothing Item ID"));
        } else {
          next(err);
        }
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
};
