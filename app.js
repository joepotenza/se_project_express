const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const app = express();
const { PORT = 3001 } = process.env;

const NotFoundError = require("./errors/NotFoundError");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

// All requests are JSON based
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for front end authorization
app.use(cors());

mongoose.connect("mongodb://localhost:27017/wtwr_db").catch(console.error);

// Log requests
app.use(requestLogger);

app.use("/", require("./routes/index"));

app.use("/", () => {
  throw new NotFoundError("Requested resource not found");
});

// Log errors
app.use(errorLogger);

// Joi error handler
app.use(errors());

// custom error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
