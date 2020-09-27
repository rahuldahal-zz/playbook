const express = require("express");

const app = express();

app.get("/api/auth/facebook", (req, res) => {
  res.send("<h1>Will log in via facebook</h1>");
});

app.get("/api/auth/email", (req, res) => {
  res.send("<h1>Will log in via email and password</h1>");
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
