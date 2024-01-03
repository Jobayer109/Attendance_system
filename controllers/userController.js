const { findUsers } = require("../services/userService");

const getUsers = async (req, res, next) => {
  try {
    const users = await findUsers();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getUserByID = () => {};

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
