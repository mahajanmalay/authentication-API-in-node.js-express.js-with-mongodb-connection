const mongoose = require("mongoose");

const Note = mongoose.model(
  "Note",
  new mongoose.Schema({
    title: String,
    note: String,
    date: { type: Date, required: true, default: Date.now }   
  })
);

module.exports = Note;
