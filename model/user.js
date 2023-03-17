const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  gender: String,
});

module.exports = mongoose.model("User", userSchema);
