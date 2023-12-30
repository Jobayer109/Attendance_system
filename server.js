const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db");
const User = require("./models/User");

// Middlewares
app.use(express.json());

// Home page
app.get("/", (_req, res) => {
  res.send("Server is running");
});

// Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid data" });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exist" });
  }
  user = new User({ name, email, password });
  await user.save();
  res.status(201).send({ message: "User created successfully", user });
});

// Database connection
connectDB("mongodb://127.0.0.1:27017/Attendance-DB").then(() => {
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`Server is running on port: https://localhost:${port}`);
  });
});
