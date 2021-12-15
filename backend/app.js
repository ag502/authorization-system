const express = require("express");
const router = require("./router");

const app = express();

app.use(express.json());

app.use("/api", router);

app.listen(3000, () => {
  console.log("port 3000 is open");
});
