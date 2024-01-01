const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }
    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;

    await user.save();
    res.status(201).send({ message: "User created successfully", user });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid credential" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credential" });
    }
    delete user._doc.password;

    // JWT Generate
    const token = jwt.sign(user._doc, "Secret-key", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    next(err);
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
