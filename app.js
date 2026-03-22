const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1/wtwr_db").catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", require("./routes/index"));

app.use("/", (req, res) =>
  res.status(404).send({ message: "Requested resource not found" })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
