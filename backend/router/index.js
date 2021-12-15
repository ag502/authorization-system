const express = require("express");

const registerRouter = require("./user-register");
const authRouter = require("./auth");

const router = express.Router();

router.use("/", registerRouter);
router.use("/", authRouter);

module.exports = router;
