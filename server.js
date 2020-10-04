const express = require("express");
const passport = require("passport");
const helmet = require("helmet");
const passportController = require("./controllers/passportController");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

const app = express();

app.use(helmet());

// initialize passportJS and use express-session
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", require("./routers/authRouter"));
app.use("/api/user", require("./routers/userRouter"));

// serve the build>index.html in production

if (process.env.NODE_ENV === "production") {
  // Create-React-App builds the static files in "build" folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.use("/*", (req, res) =>
    res.status(404).json({ message: "The requested route is not found!" })
  );
}

module.exports = app;
