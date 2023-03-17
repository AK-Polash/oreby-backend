const express = require("express");
const app = express();
const database = require("./config/db.js");
const User = require("./model/user.js");

app.use(express.json());

database();

app.listen(8000, () => {
  console.log("PORT IS RUNNING");
});

app.post("/", (req, res) => {
  const { name, email, gender } = req.body;
  const user = new User({
    name,
    email,
    gender,
  });

  user.save();
  res.send(user);
});
