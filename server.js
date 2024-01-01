const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require("bcrypt");
const connectDB = require("./db");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

// Middlewares
app.use(express.json());

// Home page
app.get("/", (req, res) => {
  res.status(200).send("<h1>Server is running</h1>");
});

// Register
app.post("/api/v1/auth/register", async (req, res, next) => {
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
});

// Login
app.post("/api/v1/auth/login", async (req, res, next) => {
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
});

// Private route
app.get("/api/v1/private", async (req, res) => {
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
    return res.status(200).json({ message: "This is private route" });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Global error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Server error occurred" });
});

// Database connection
connectDB("mongodb://127.0.0.1:27017/Attendance-DB").then(() => {
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
  });
});
