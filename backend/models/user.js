const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING(45),
      password: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
