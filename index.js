const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello world!!");
});

app.listen(3000, () => {
  console.log(`The ports is running over port number ${PORT}`);
});
