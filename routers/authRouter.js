const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/facebook", passport.authenticate("facebook"));

router.post("/email", passport.authenticate("local"), (req, res) => {
  res.status("202").json({ message: "The user is authenticated..." });
});

// handle the exchange of "code" from the provider to get the "actual" user details

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.status("202").json({ message: "The user is authenticated" });
});

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    res.status("202").json({ message: "The user is authenticated" });
  }
);

module.exports = router;
