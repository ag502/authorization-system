const express = require("express");
const authController = require("../controller/auth");
const message = require("../commons/message");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    const canLogin = await authController.checkAccount(id, password);
    if (canLogin) {
      const token = await authController.makeJWTToken(id);
      res.status(200).send({ message: message.REQUEST_SUCCESS, data: token });
    } else {
      res.status(401).send({ message: message.REQUEST_FAIL });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: message.SERVER_ERROR });
  }
});

module.exports = router;
