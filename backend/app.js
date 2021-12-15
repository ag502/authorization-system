const express = require("express");
const db = require("./models");

const { User } = db;
const app = express();

app.listen(3000, () => {
  console.log("port 3000 is open");
});
