const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  gender: { type: String },
});

module.exports = mongoose.model("User", userSchema);
