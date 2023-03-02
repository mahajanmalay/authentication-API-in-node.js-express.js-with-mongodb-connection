const mongoose = require("mongoose");

const Assignment = mongoose.model(
  "Assignment",
  new mongoose.Schema({
    title: String,
    assignment: String,
    lastd:Date,
    date: { type: Date, required: true, default: Date.now }   
  })
);

module.exports = Assignment;
