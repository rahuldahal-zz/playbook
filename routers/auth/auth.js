const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/facebook", passport.authenticate("facebook"));

router.get("/email", (req, res) => {
  res.send("<h1>Will log in via email and password</h1>");
});

// handle the exchange of "code" from the provider to get the "actual" user details

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("<h1>Authenticated via Google</h1>");
});

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    res.send("<h1>Authenticated via Facebook</h1>");
  }
);

module.exports = router;
