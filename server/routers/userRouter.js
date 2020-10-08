const router = require("express").Router();
const { mustHaveToken, grantAccess } = require("../controllers/userController");

router.get("/protected", mustHaveToken, grantAccess);

module.exports = router;
