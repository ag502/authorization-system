const db = require("../models");

const { User } = db;

async function getAllUsers() {
  const users = await User.findAll({ attributes: ["id", "name", "createdAt"] });
  return users;
}

async function deleteUsers(ids) {
  await User.destroy({ where: { id: ids } });
}

const adminController = {};
adminController.getAllUsers = getAllUsers;
adminController.deleteUsers = deleteUsers;

module.exports = adminController;
