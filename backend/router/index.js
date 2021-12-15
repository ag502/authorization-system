const express = require("express");

const registerRouter = require("./user-register");
const authRouter = require("./auth");
const adminRouter = require("./admin");

const router = express.Router();

router.use("/", registerRouter);
router.use("/", authRouter);
router.use("/admin", adminRouter);

module.exports = router;
