const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    joinedOn: { type: Date, default: Date.now() },
  },
  { discriminatorKey: "loginType" }
);

const User = mongoose.model("user", userSchema);

const OAuthLogin = User.discriminator(
  "OAuth",
  new Schema({
    OAuthID: String,
    firstName: String,
    lastName: String,
    email: { type: String, default: null },
    provider: String,
    avatar: { type: String, default: null },
  })
);

const CustomLogin = User.discriminator(
  "custom",
  new Schema({
    email: { type: String, required: true },
    password: { type: String },
  })
);

module.exports = { User, OAuthLogin, CustomLogin };
