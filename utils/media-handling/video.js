const storage = require("../media-handling/storage");
const multer = require("multer");

const uploadVideo = multer({
  storage: storage("videos"),

  // add file filter
  fileFilter: (req, file, callback) => {
    if (file.mimetype == "video/mp4") {
      callback(null, true);
    } else {
      const err = new Error("only mp4 allowed to upload");
      callback(err, false);
    }
  },

  // error handling
  onError: (error, next) => {
    next(error);
  },
});

module.exports = uploadVideo;
