const router = require("express").Router();
const passport = require("passport");
const generateToken = require("../utils/generateToken");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/facebook", passport.authenticate("facebook"));

router.post("/email", passport.authenticate("local"), (req, res) => {
  res.status("202").json({ token: generateToken(req.user._id) });
});

// handle the exchange of "code" from the provider to get the "actual" user details

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.status("202").json({ token: generateToken(req.user._id) });
});

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    res.status("202").json({ token: generateToken(req.user._id) });
  }
);

module.exports = router;
