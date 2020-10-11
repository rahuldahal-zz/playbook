const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
  {
    joinedOn: { type: Date, default: Date.now() },
    hasSubscribed: { type: Boolean, default: false },
    companyName: {
      type: String,
    },
    companyIndustry: {
      type: String,
    },
    productType: {
      type: String,
    },
    areasOfStruggle: {
      type: [String],
    },
    annualRevenue: {
      type: String,
    },
    isAdmin: { type: Boolean, default: false },
  },
  { discriminatorKey: "loginType" }
);

userSchema.statics.isEmailValid = function (enteredEmail) {
  return validator.isEmail(enteredEmail);
};

userSchema.statics.isObjectId = function (string) {
  if (!string || typeof string !== "string") {
    return false;
  }
  return validator.isMongoId(string);
};

userSchema.statics.toObjectId = function (string) {
  return mongoose.Types.ObjectId(string);
};

userSchema.methods.isCreateProfileDataValid = function (data) {
  return new Promise((resolve, reject) => {
    const errors = [];
    for (const key in data) {
      if (
        !data[key] ||
        (key !== "areasOfStruggle" && typeof data[key] !== "string")
      ) {
        errors.push(`${key} is not valid`);
      }

      // check for valid areas, use emum...

      if (key === "areasOfStruggle") {
        const nonStringAreas = data[key].filter(
          (area) => typeof area !== "string"
        );
        errors.push(...nonStringAreas);
      }
    }
    if (errors.length) {
      return reject(errors);
    }
    return resolve("Successfully validated. Nothing bogus with the data.");
  });
};

// creating the User model
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
    email: {
      type: String,
      required: [true, "Must provide an email to register."],
    },
    password: {
      type: String,
    },
  })
);

module.exports = { User, OAuthLogin, CustomLogin };
