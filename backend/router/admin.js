const express = require("express");
const adminController = require("../controller/admin");
const message = require("../commons/message");

const router = express.Router();

router.get("/all-users", async (req, res) => {
  try {
    const allUsers = await adminController.getAllUsers();
    res.status(200).send({ message: message.REQUEST_SUCCESS, data: allUsers });
  } catch (err) {
    res.status(500).send({ message: message.SERVER_ERROR });
  }
});

router.delete("/users", async (req, res) => {
  const { ids } = req.body;
  try {
    await adminController.deleteUsers(ids);
    res.status(200).send({ message: message.REQUEST_SUCCESS });
  } catch (err) {
    res.status(500).send({ message: message.SERVER_ERROR });
  }
});

module.exports = router;
