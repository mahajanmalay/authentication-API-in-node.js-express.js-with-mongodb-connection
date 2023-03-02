const mongoose = require("mongoose");

const Test = mongoose.model(
  "Test",
  new mongoose.Schema({
    question: String,
    answer: String,
  })
);

module.exports = Test;
