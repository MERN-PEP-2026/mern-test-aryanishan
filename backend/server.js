const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;