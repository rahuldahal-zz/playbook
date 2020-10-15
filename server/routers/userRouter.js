const router = require("express").Router();
const {
  mustHaveToken,
  createProfile,
  getAll,
  mustBeAdmin,
} = require("../controllers/userController");

router.get("/", mustHaveToken, mustBeAdmin, getAll);
router.put("/create-profile", mustHaveToken, createProfile);
// router.get("/courses", mustHaveToken, getAvailableCourses);

module.exports = router;
