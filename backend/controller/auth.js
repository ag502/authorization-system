const jwt = require("jsonwebtoken");

const db = require("../models");
const {
  development: { secret },
  jwtExpire,
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
    jwt.sign({ data: id }, secret, { expiresIn: jwtExpire }, (err, token) => {
      err ? reject(err) : resolve(token);
    });
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decode) => {
      err ? resolve(null) : resolve(decode);
    });
  });
}

const authController = {};
authController.checkAccount = checkAccount;
authController.makeJWTToken = makeJWTToken;
authController.verifyToken = verifyToken;

module.exports = authController;
