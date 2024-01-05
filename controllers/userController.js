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
  const userId = req.params.userId;

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

const putUserById = () => {};

const patchUserById = () => {};

const deleteUserById = () => {};

module.exports = {
  getUsers,
  getUserByID,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
