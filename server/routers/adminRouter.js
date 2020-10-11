const router = require("express").Router();
const {
  mustHaveToken,
  mustBeAdmin,
  makeAdmin,
  removeAdmin,
} = require("../controllers/userController");

const { create } = require("../controllers/courseController");

router.get("/", mustHaveToken, mustBeAdmin, (req, res) =>
  res.send("Hey Admin!!")
);

router.put("/create", mustHaveToken, mustBeAdmin, makeAdmin);

router.put("/delete", mustHaveToken, mustBeAdmin, removeAdmin);

// course related route

router.post("/course/create", mustHaveToken, mustBeAdmin, create);

module.exports = router;
