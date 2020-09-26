const express = require("express");

const app = express();

app.get("/api/auth/facebook", (req, res) => {
  res.send("<h1>Welcome to PlayBook</h1>");
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
