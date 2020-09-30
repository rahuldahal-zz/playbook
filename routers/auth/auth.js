const router = require("express").Router();
const passport = require("passport");
const proxy = require("../../utils/proxyRedirect");

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
  res.redirect(proxy("/create-profile"));
});

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect(proxy("/create-profile"));
  }
);

module.exports = router;
