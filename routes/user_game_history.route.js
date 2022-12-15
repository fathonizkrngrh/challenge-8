const express = require("express");
const router = express.Router();
const c = require("../controller/user_game_history");
const mid = require("../helper/middleware");

// user game history
router.post("/add", mid.mustlogin, c.addRecord);
router.get("/show", mid.mustlogin, c.showAll);
router.get("/show/rank", mid.mustlogin, c.rankingRecord);
router.get("/show/:id", mid.mustlogin, c.detailRecord);

module.exports = router;
