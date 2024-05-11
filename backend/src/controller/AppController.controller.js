const express = require("express");
const router = express.Router();
const fs = require("fs");

const { upload } = require("../helpers/constants");

let images = [];

/**
 * post request at /upload
 *
 * - the uploaded images are sent to this url
 * - an additional hidden field containing the order of the images is accessed through req.body.fileOrder
 * - the images are sorted according to the order specified in the hidden field
 *
 *
 * ALTERNATE METHOD FOR REORDERING FILES:
 * - pass in the images array into the upload link using ejs
 * - ejs templating allows to display the images in the order they were uploaded
 * - allow updation and keep a save button to save the new order and update the images array
 *
 */
router.post("/upload", upload.array("files"), (req, res) => {
  if (req.files) {
    const fileOrder = req.body.fileOrder;

    images = [...req.files];

    const orderMap = {};
    fileOrder.split(",").forEach((item, index) => {
      orderMap[item] = index;
    });

    function sortByOrder(a, b) {
      const orderA = orderMap[a.originalname] || -1;
      const orderB = orderMap[b.originalname] || -1;
      return orderA - orderB;
    }

    images.sort(sortByOrder);
  } else {
    res.send("No images uploaded!");
  }
  res.send("Images uploaded successfully!");

  //   const html = fs.readFileSync(__dirname + "/public/upload.html", "utf8");
  //   res.send(html);
});

/**
 * get request at /images that allows the frontend to fetch the images uploaded to the backend
 */
router.get("/images", (req, res) => {
  res.json(images);
});

module.exports = router;
