const jwt = require("jsonwebtoken");

const db = require("../models");
const {
  development: { secret },
} = require("../config/config.json");
const { comparePassword } = require("../commons/functions");

const { User } = db;

async function checkAccount(id, password) {
  const curUser = await User.findOne({ where: { name: id } });
  if (curUser?.password) {
    const isExact = await comparePassword(password, curUser.password);
    return isExact;
  } else {
    return false;
  }
}

function makeJWTToken(id) {
  return new Promise((resolve, reject) => {
    jwt.sign({ data: id }, secret, { expiresIn: "25m" }, (err, token) => {
      err ? reject(err) : resolve(token);
    });
  });
}

const authController = {};
authController.checkAccount = checkAccount;
authController.makeJWTToken = makeJWTToken;

module.exports = authController;
