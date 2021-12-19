const db = require("../models");
const { makeHashedPassword } = require("../commons/functions");

const { User } = db;

async function checkExistence(id) {
  const user = await User.findOne({ where: { name: id } });
  if (user) {
    return true;
  } else {
    return false;
  }
}

async function addUserAccount(id, password) {
  const hashedPassword = await makeHashedPassword(password);
  await User.create({ name: id, password: hashedPassword });
}

const registerController = {};
registerController.checkExistence = checkExistence;
registerController.addUserAccount = addUserAccount;

module.exports = registerController;
