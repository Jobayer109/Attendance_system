const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (_req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
