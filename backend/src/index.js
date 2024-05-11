const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const publicPath = path.join(__dirname, "./public");

const appController = require("./controller/AppController.controller");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(publicPath));

app.use("/", appController);

const port = 8081;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
