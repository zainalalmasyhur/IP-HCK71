"use strict";
const { hashPassword } = require(`../helpers/bcrypt`);

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username is null",
          },
          notEmpty: {
            msg: "username is empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "email is null",
          },
          notEmpty: {
            msg: "email is empty",
          },
          isEmail: {
            msg: "wrong format email",
            args: true,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is null",
          },
          notEmpty: {
            msg: "password is empty",
          },
          len: {
            msg: "minimal password length is 5",
            args: [5],
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (user, options) => {
    user.role = "Staff";
    user.password = hashPassword(user.password);
  });

  return User;
};
