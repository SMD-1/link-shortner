const mongoose = require("mongoose");

const dbSchema = mongoose.Schema({
  bigLink: {
    type: String,
    required: true,
  },
  shortlink: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("links", dbSchema);
