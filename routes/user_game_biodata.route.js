const express = require("express");
const router = express.Router();
const c = require("../controller/user_game_biodata");
const mid = require("../helper/middleware");
const rbac = require("../utils/rbac");
const roles = require("../utils/users/role");

// user game biodata
router.post("/:userId/add", mid.mustlogin, mid.isBioExist, c.addBio);
router.get("/show", mid.mustlogin, c.showAll);
router.get("/:userId/show", mid.mustlogin, mid.bioMustExist, c.detailBio);
router.post(
  "/:userId/changephonenumber",
  mid.mustlogin,
  mid.bioMustExist,
  c.updatePhoneNumber
);
router.delete("/:userId/delete", mid.mustlogin, mid.bioMustExist, c.deleteBio);

module.exports = router;
