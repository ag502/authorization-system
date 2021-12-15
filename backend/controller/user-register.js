const db = require("../models");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const { User } = db;

async function checkExistence(id) {
  const user = await User.findOne({ where: { name: id } });
  console.log(user);
  if (user) {
    return true;
  } else {
    return false;
  }
}

function addUserAccount(id, password) {
  bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
    await User.create({ name: id, password: hash });
  });
}

const registerController = {};
registerController.checkExistence = checkExistence;
registerController.addUserAccount = addUserAccount;

module.exports = registerController;
