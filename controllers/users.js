const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const User = require("../models/user");

const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

// GET /users/me -- Get current user
const getCurrentUser = (req, res, next) => {
  try {
    User.findById(req.user._id)
      .orFail()
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === "DocumentNotFoundError") {
          next(new NotFoundError("User not found"));
        } else if (err.name === "CastError") {
          next(new BadRequestError("Invalid User ID"));
        } else {
          next(err);
        }
      });
  } catch (err) {
    next(err);
  }
};

// PATCH /users/me -- Update current user info
const updateUserInfo = (req, res, next) => {
  try {
    const updatedInfo = {};
    if (!req.body.name && !req.body.avatar) {
      throw new BadRequestError("Invalid Data");
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
        if (err.name === "DocumentNotFoundError") {
          next(new NotFoundError("User not found"));
        } else if (err.name === "ValidationError") {
          next(new BadRequestError("Invalid Data"));
        } else {
          next(err);
        }
      });
  } catch (err) {
    next(err);
  }
};

// POST /signup -- Create a new user
const createUser = (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;
    // hash the password before storing in the database
    if (!password) {
      throw new BadRequestError("Invalid Data");
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
            if (err.name === "ValidationError") {
              next(new BadRequestError("Invalid Data"));
            } else if (err.code && err.code === 11000) {
              next(new ConflictError("Email already exists"));
            } else {
              next(err);
            }
          });
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

// POST /signin -- Login with email and password
const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Invalid Data");
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch(() =>
      next(new UnauthorizedError("Incorrect email address or password"))
    );
};

module.exports = {
  getCurrentUser,
  updateUserInfo,
  createUser,
  login,
};
