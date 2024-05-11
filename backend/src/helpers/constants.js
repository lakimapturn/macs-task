/**
 * sets up the multer storage engine in order to save images that are uploaded to the backend
 */

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "_" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
