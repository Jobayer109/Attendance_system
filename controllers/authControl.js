const { registerService, loginService } = require("../services/authService");

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const user = await registerService({ name, email, password });
    return res.status(200).json({ message: "User created successfully", user });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginService({ email, password });
    res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    next(e);
  }
};

const homeController = (_req, res) => {
  res.status(200).send("<h1>Server is running</h1>");
};

const privateController = (_req, res) => {
  return res.status(200).json({ message: "This is private route" });
};

module.exports = {
  registerController,
  loginController,
  homeController,
  privateController,
};
