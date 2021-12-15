const express = require("express");
const registerController = require("../controller/user-register");
const message = require("../commons/message");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { id, password } = req.body;

  try {
    const isExistedUser = await registerController.checkExistence(id);
    console.log(isExistedUser);
    if (isExistedUser) {
      res.status(409).send({ message: message.ALREADY_EXISTENCE });
    } else {
      await registerController.addUserAccount(id, password);
      res.status(201).send({ message: message.REQUEST_SUCCESS });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: message.SERVER_ERROR });
  }
});

module.exports = router;
