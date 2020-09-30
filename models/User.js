const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  OAuthID: String,
  firstName: String,
  lastName: String,
  email: { type: String, default: null },
  avatar: String,
  provider: String,
  joinedOn: { type: Date, default: Date.now() },
});

module.exports = User = mongoose.model("user", UserSchema);
