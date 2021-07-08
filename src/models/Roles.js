const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema({
  role: String,
});

module.exports = mongoose.model("Roles", RolesSchema);
