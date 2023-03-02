const mongoose = require("mongoose");

const Enquire = mongoose.model(
  "Enquire",
  new mongoose.Schema({
    name: String,
    phone: Number,
    email:String,
    enquiry:String
  })
);

module.exports = Enquire;
