const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/create-profile", userController.mustBeLoggedIn);

module.exports = router;
