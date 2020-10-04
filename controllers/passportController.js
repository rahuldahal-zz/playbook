const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

passport.serializeUser((user, done) => {
  console.log("serializing the user...");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializing the user...");
  User.findById(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      // options
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // this function fires as soon as passport exchanges the "code" with "actual" user data.
      const userDetails = profile._json;

      // check if user already exists

      User.findOne({ OAuthID: userDetails.sub })
        .then((user) => {
          if (!user) {
            return createUser(
              {
                OAuthID: userDetails.sub,
                firstName: userDetails.given_name,
                lastName: userDetails.family_name,
                email: userDetails.email,
                avatar: userDetails.picture,
                provider: "google",
              },
              done
            );
          }

          // user already exists
          console.log("user already exists...");
          done(null, user);
        })
        .catch((err) => console.log(err));
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: [
        "id",
        "displayName",
        "first_name",
        "last_name",
        "photos",
        "email",
      ],
    },
    (accessToken, refreshToken, profile, done) => {
      //check if user exists

      const userDetails = profile._json;

      User.findOne({ OAuthID: userDetails.id })
        .then((user) => {
          if (!user) {
            return createUser(
              {
                OAuthID: userDetails.id,
                firstName: userDetails.first_name,
                lastName: userDetails.last_name,
                email: userDetails.email || null,
                avatar: userDetails.picture.data.url,
                provider: "facebook",
              },
              done
            );
          }

          // user already exists
          console.log("user already exists...");
          done(null, user);
        })
        .catch((err) => console.log(err));
    }
  )
);

function createUser(userDetails, done) {
  new User(userDetails)
    .save()
    .then((user) => {
      console.log("New user is created...", user);
      done(null, user);
    })
    .catch((err) => console.log(err));
}
