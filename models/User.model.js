const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  ip: String,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
