const express = require("express");

const registerRouter = require("./user-register");

const router = express.Router();

router.use("/", registerRouter);

module.exports = router;
