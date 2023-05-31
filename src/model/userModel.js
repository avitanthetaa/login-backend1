const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
    default: "",
  },
  otp: {
    type: Number,
  },
});

const model = mongoose.model("users", schema);

module.exports = model;
