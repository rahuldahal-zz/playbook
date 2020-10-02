const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const helmet = require("helmet");
const passportController = require("./controllers/passport");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

const app = express();

app.use(helmet());

// initialize passportJS and use express-session
app.use(passport.initialize());
app.use(passport.session());

const authRouter = require("./routers/auth/auth");

app.use("/api/auth", authRouter);
app.use("/*", (req, res) =>
  res.status(404).json({ message: "The requested route is not found!" })
);

module.exports = app;
