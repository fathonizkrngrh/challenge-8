const express = require("express");
const router = express.Router();
const c = require("../controller");
const mid = require("../helper/middleware");

// authorization
router.post("/auth/register", c.auth.register);
router.post("/auth/login", c.auth.login);
router.get("/auth/show", mid.mustlogin, c.auth.showAll);
router.get("/auth/me", mid.mustlogin, c.auth.whoami);
router.post("/auth/changepassword", mid.mustlogin, c.auth.changePassword);
router.delete("/auth/deleteuser/:id", mid.mustlogin, c.auth.deleteUser);

// user game biodata
router.post("/bio/add", mid.mustlogin, c.user_game_biodata.addBio);
router.get("/bio/show", mid.mustlogin, c.user_game_biodata.showAll);
router.get("/bio/show/:id", mid.mustlogin, c.user_game_biodata.detailBio);
router.post(
  "/bio/changephonenumber",
  mid.mustlogin,
  c.user_game_biodata.updatePhoneNumber
);
router.delete("/bio/delete/:id", mid.mustlogin, c.user_game_biodata.deleteBio);

// user game history
router.post("/history/add", mid.mustlogin, c.user_game_history.addRecord);
router.get("/history/show", mid.mustlogin, c.user_game_history.showAll);
router.get(
  "/history/show/rank",
  mid.mustlogin,
  c.user_game_history.rankingRecord
);
router.get(
  "/history/show/:id",
  mid.mustlogin,
  c.user_game_history.detailRecord
);

module.exports = router;
