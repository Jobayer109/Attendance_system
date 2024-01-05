const { findUsers, findUserByProperty } = require("../services/userService");
const authService = require("../services/authService");
const error = require("../utils/error");
// Get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await findUsers();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

// Get a single user by it's id.
const getUserByID = async (req, res, next) => {
  const { userId } = req.params;

  const user = await findUserByProperty("_id", userId);
  if (!user) {
    throw error("User not found", 404);
  }
  res.status(200).json(user);
  try {
  } catch (e) {
    next(e);
  }
};

// Create user.
const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const putUserById = (req, res, next) => {};

const patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus } = req.body;

  try {
    const user = await findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  const user = await findUserByProperty("_id", userId);
  await user.deleteOne();
  return res.status(203).send();
};

module.exports = {
  getUsers,
  getUserByID,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
