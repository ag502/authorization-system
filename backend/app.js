const express = require("express");
const router = require("./router");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(3000, () => {
  console.log("port 3000 is open");
});
