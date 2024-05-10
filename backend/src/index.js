const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const publicPath = path.join(__dirname, "./public");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(publicPath));

const port = 8081;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
