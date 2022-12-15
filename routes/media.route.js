const express = require("express");
const router = express.Router({ mergeParams: true });
const uploadVideo = require("../utils/media-handling/video");
const uploadImage = require("../utils/media-handling/image");
const rbac = require("../utils/rbac");
const c = require("../controller/media.controller");

router.post(
  "/video",
  rbac("Admin"),
  uploadVideo.single("video"),
  c.uploadSingleVideo
);
router.post(
  "/image",
  rbac("Admin"),
  uploadImage.single("image"),
  c.uploadSingleImage
);
router.get("/", c.showMedia);

module.exports = router;
