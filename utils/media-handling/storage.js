const multer = require("multer");
const path = require("path");

const storage = (location) => {
  return multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `./public/${location}`);
    },

    // generata unique filename
    filename: (req, file, callback) => {
      const fileName = `${Date.now()}${path.extname(file.originalname)}`;
      callback(null, fileName);
    },
  });
};

module.exports = storage;
