const db = require("../models");

const { User } = db;

async function getAllUsers() {
  const users = await User.findAll({ attributes: ["id", "name", "createdAt"] });
  return users;
}

const adminController = {};
adminController.getAllUsers = getAllUsers;

module.exports = adminController;
