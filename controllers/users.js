const User = require("../models/user");
const {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// Get all users
const getUsers = (req, res) => {
  try {
    User.find()
      .then((users) => {
        if (!users) {
          return res
            .status(NOT_FOUND_ERROR)
            .send({ message: "No users found" });
        }
        return res.send(users);
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

// Get a user by ID
const getUser = (req, res) => {
  try {
    User.findById(req.params.userId)
      .orFail()
      .then((user) => res.send(user))
      .catch((err) => {
        console.error(err);
        if (err.name === "DocumentNotFoundError") {
          return res
            .status(NOT_FOUND_ERROR)
            .send({ message: "User not found" });
        }
        if (err.name === "CastError") {
          return res
            .status(INVALID_DATA_ERROR)
            .send({ message: "Invalid User ID" });
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

// Create a new user
const createUser = (req, res) => {
  try {
    const { name, avatar } = req.body;
    User.create({ name, avatar })
      .then((user) => res.status(201).send(user))
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          return res.status(INVALID_DATA_ERROR).send({ message: err.message });
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
  getUsers,
  getUser,
  createUser,
};
