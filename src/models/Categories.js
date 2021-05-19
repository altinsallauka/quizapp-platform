const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  categoryName: String,
});

module.exports = mongoose.model("Categories", CategoriesSchema);
