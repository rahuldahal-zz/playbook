const router = require("express").Router();
const {
  mustHaveToken,
  createProfile,
} = require("../controllers/userController");

router.put("/create-profile", mustHaveToken, createProfile);

module.exports = router;
