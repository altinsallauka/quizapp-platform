const mongoose = require("mongoose");

const ResultsSchema = new mongoose.Schema({
  studentName: String,
  score: Number,
});

module.exports = mongoose.model("Results", ResultsSchema);
