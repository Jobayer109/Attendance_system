const User = require("../models/User");

const findUsers = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({ name, email, password, roles, accountStatus });
  return user.save();
};

module.exports = {
  findUserByProperty,
  createNewUser,
  findUsers,
};
