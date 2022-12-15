const express = require("express");
const router = express.Router();
const auth = require("../controller/auth.controller");
const oauth = require("../controller/oauth.controller");
const mid = require("../helper/middleware");

// authorization
router.post("/register", auth.register);
router.get("/register", auth.registerPage);
router.post("/login", auth.login);
router.get("/login", auth.loginPage);
router.get("/show", mid.mustlogin, auth.showAll);
router.get("/me", mid.mustlogin, auth.whoami);
router.post("/changepassword", auth.changePassword);
router.get("/changepassword", auth.changePasswordPage);
router.delete("/deleteuser/:id", mid.mustlogin, auth.deleteUser);

//google
router.post("/login/google", oauth.google);

module.exports = router;
