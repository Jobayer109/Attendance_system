const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./userService");
const error = require("../utils/error");

const registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty("email", email);
  if (user) throw error("User already exist", 400);

  // password hashing and create new user.
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return createNewUser({ name, email, password: hash });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);
  if (!user) throw error("Invalid email", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw error("Invalid password", 400);

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };

  return jwt.sign(payload, "Secret-key", { expiresIn: "1h" });
};
module.exports = {
  registerService,
  loginService,
};
