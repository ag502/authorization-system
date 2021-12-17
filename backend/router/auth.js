const express = require("express");
const authController = require("../controller/auth");
const message = require("../commons/message");

const router = express.Router();

// 로그인
router.post("/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    const canLogin = await authController.checkAccount(id, password);
    if (canLogin) {
      const token = await authController.makeJWTToken(id);
      res.status(200).send({ message: message.REQUEST_SUCCESS, token });
    } else {
      res.status(401).send({ message: message.REQUEST_FAIL });
    }
  } catch (err) {
    res.status(500).send({ message: message.SERVER_ERROR });
  }
});

// 로그인 검증
router.get("/check", async (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(401).send({ message: message.NOT_LOGIN });
  }

  try {
    const result = await authController.verifyToken(token);

    if (result) {
      res.status(200).send({ message: message.ALREADY_LOGIN, data: result });
    } else {
      res.status(401).send({ message: message.NOT_LOGIN });
    }
  } catch (err) {
    res.status(500).send({ message: message.SERVER_ERROR });
  }
});

module.exports = router;
