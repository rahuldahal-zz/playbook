const express = require("express");
const mongoose = require("mongoose");
const passportController = require("./controllers/passport");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// connecting to MongoDB via mongoose
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const authRouter = require("./routers/auth/auth");

app.use("/api/auth", authRouter);
app.use("/*", (req, res) =>
  res.status(404).json({ message: "The requested route is not found!" })
);

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
