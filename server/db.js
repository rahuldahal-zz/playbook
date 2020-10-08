const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const app = require("./server");

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => afterConnection())
  .catch((err) =>
    console.error("Cannot connect to MongoDB, app is not listening")
  );

function afterConnection() {
  console.log("Connected to MongoDB");
  // session setup
  let sessionOptions = {
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 15, httpOnly: true },
  };

  app.use(session(sessionOptions));

  // begin listening
  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`Server running on port ${port}`));
}
