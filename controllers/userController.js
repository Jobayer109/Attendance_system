const { findUsers, findUserByProperty } = require("../services/userService");
const error = require("../utils/error");

const getUsers = async (req, res, next) => {
  try {
    const users = await findUsers();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

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

const postUser = () => {};

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
