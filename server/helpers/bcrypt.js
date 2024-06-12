const { hashSync, compareSync } = require("bcryptjs");

function hashPassword(password) {
  return hashSync(password, 10);
}

function comparePassword(password, hashedPassword) {
  return compareSync(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };
