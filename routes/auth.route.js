const express = require("express");
const router = express.Router();
const auth = require("../controller/auth");
const oauth = require("../controller/oauth");
const mid = require("../helper/middleware");

// authorization
router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/show", mid.mustlogin, auth.showAll);
router.get("/me", mid.mustlogin, auth.whoami);
router.post("/changepassword", mid.mustlogin, auth.changePassword);
router.delete("/deleteuser/:id", mid.mustlogin, auth.deleteUser);

//google
router.post("/login/google", oauth.google);

module.exports = router;
