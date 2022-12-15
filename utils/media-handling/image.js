const storage = require("../media-handling/storage");
const multer = require("multer");

const uploadImage = multer({
  storage: storage("images"),

  // add file filter
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      const err = new Error("only png, jpg, and jpeg allowed to upload");
      callback(err, false);
    }
  },

  // error handling
  onError: (error, next) => {
    next(error);
  },
});

module.exports = uploadImage;
