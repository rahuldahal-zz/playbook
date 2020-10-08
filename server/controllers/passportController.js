const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/User");
const { User, OAuthLogin, CustomLogin } = UserModel;
const bcryptjs = require("bcryptjs");
const salt = bcryptjs.genSaltSync(10);
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

      OAuthLogin.findOne({ OAuthID: userDetails.sub })
        .then((user) => {
          if (!user) {
            return createUser(
              "OAuthLogin",
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

      OAuthLogin.findOne({ OAuthID: userDetails.id })
        .then((user) => {
          if (!user) {
            return createUser(
              "OAuthLogin",
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

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    const isEmailValid =
      CustomLogin.isEmailValid(email) &&
      CustomLogin.findOne({ email })
        .then((user) => {
          if (!user) {
            return createUser(
              "CustomLogin",
              {
                email,
                password: bcryptjs.hashSync(password, salt),
              },
              done
            );
          }
          console.log("user already exists");

          if (!bcryptjs.compareSync(password, user.password)) {
            return done(null, false, { message: "Incorrect password" });
          }
          done(null, user);
        })
        .catch((err) => done(err));

    if (!isEmailValid) {
      return done(null, false, { message: "Invalid email received" });
    }
  })
);

function createUser(type, userDetails, done) {
  // calls either "OAuthLogin" or "CustomLogin" at runtime

  new UserModel[type](userDetails)
    .save()
    .then((user) => {
      console.log(`New user is created using ${type}...`, user);
      done(null, user);
    })
    .catch((err) => console.log(err));
}
