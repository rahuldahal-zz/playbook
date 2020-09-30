const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const helmet = require("helmet");
const passportController = require("./controllers/passport");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(helmet());

// connecting to MongoDB via mongoose
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Cannot connect to MongoDB"));

// session setup

let sessionOptions = {
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
};

app.use(session(sessionOptions));

// initialize passportJS and use express-session
app.use(passport.initialize());
app.use(passport.session());

const authRouter = require("./routers/auth/auth");

app.use("/api/auth", authRouter);
app.use("/*", (req, res) =>
  res.status(404).json({ message: "The requested route is not found!" })
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
