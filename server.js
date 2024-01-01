const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db");
const routes = require("./routes");

// Middlewares
app.use(express.json());
app.use(routes);

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
