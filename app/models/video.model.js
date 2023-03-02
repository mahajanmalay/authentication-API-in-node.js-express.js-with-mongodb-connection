const mongoose = require("mongoose");

const Video = mongoose.model(
  "Video",
  new mongoose.Schema({
    title: String,
    detail: String,
    vLink: String    
  })
);

module.exports = Video;
