const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require("bcrypt");
const connectDB = require("./db");
const User = require("./models/User");

// Middlewares
app.use(express.json());

// Home page
app.get("/", (req, res) => {
  res.status(200).send("<h1>Server is running</h1>");
});

// Register
app.post("/register", async (req, res, next) => {
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
