const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ message: "Unauthorized Access" });
    }

    token = token.split(" ")[1];
    const decoded = await jwt.verify(token, "Secret-key");
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(400).json({ message: "Unauthorized Access" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json(err.message);
  }
}

module.exports = authenticate;
