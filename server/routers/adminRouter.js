const router = require("express").Router();
const {
  mustHaveToken,
  mustBeAdmin,
  makeAdmin,
  removeAdmin,
} = require("../controllers/userController");

const { create, getAll, editOne } = require("../controllers/courseController");

router.get("/", mustHaveToken, mustBeAdmin, (req, res) =>
  res.send("Hey Admin!!")
);

router.put("/create", mustHaveToken, mustBeAdmin, makeAdmin);

router.put("/delete", mustHaveToken, mustBeAdmin, removeAdmin);

// course related route

router
  .route("/course")
  .get(mustHaveToken, mustBeAdmin, getAll)
  .post(mustHaveToken, mustBeAdmin, create)
  .put(mustHaveToken, mustBeAdmin, editOne);

module.exports = router;
