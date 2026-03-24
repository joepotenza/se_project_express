const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const User = require("../models/user");

const {
  INVALID_DATA_ERROR,
  AUTHORIZATION_ERROR,
  NOT_FOUND_ERROR,
  DATA_CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// GET /users/me -- Get current user
const getCurrentUser = (req, res) => {
  try {
    User.findById(req.user._id)
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

// PATCH /users/me -- Update current user info
const updateUserInfo = (req, res) => {
  try {
    const updatedInfo = {};
    if (!req.body.name && !req.body.avatar) {
      return res.status(INVALID_DATA_ERROR).send({ message: "Invalid Data" });
    }
    if (req.body.name) {
      updatedInfo.name = req.body.name;
    }
    if (req.body.avatar) {
      updatedInfo.avatar = req.body.avatar;
    }
    User.findByIdAndUpdate(
      req.user._id,
      {
        $set: updatedInfo,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .orFail()
      .then((user) => res.send(user))
      .catch((err) => {
        console.error(err);
        if (err.name === "DocumentNotFoundError") {
          return res
            .status(NOT_FOUND_ERROR)
            .send({ message: "User not found" });
        }
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

// POST /signup -- Create a new user
const createUser = (req, res) => {
  try {
    const { name, avatar, email, password } = req.body;
    // hash the password before storing in the database
    if (!password) {
      return res.status(INVALID_DATA_ERROR).send({ message: "Invalid Data" });
    }
    bcrypt
      .hash(password, 10) // 10-character salt
      .then((hashedPassword) => {
        User.create({ name, avatar, email, password: hashedPassword })
          .then((user) => {
            /*
              Bug fixed: delete does not work against the raw user object since it is technically a Mongoose document
              and not a regular JS object
            */
            const newUser = user.toObject();
            delete newUser.password;
            res.status(201).send(newUser);
          })
          .catch((err) => {
            console.error(err);
            if (err.name === "ValidationError") {
              return res
                .status(INVALID_DATA_ERROR)
                .send({ message: "Invalid Data" });
            }
            if (err.code && err.code === 11000) {
              return res
                .status(DATA_CONFLICT_ERROR)
                .send({ message: "Email already exists" });
            }
            return res
              .status(INTERNAL_SERVER_ERROR)
              .send({ message: "An error has occurred on the server" });
          });
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

// POST /signin -- Login with email and password
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(INVALID_DATA_ERROR).send({ message: "Invalid Data" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch(() =>
      res
        .status(AUTHORIZATION_ERROR)
        .send({ message: "Invalid email address or password" })
    );
};

module.exports = {
  getCurrentUser,
  updateUserInfo,
  createUser,
  login,
};
