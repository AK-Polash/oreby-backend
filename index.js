const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/user.js");

app.use(express.json());

app.listen(8000, () => {
  console.log("PORT IS RUNNING");
});

mongoose
  .connect(
    "mongodb+srv://Polash:plumbum7@cluster0.srdzrgk.mongodb.net/oreby?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected!"));

app.post("/signup", async (req, res) => {
  const { name, email, gender } = req.body;

  const user = new User({
    name: name,
    email: email,
    gender: gender,
  });

  user.save();
  res.send({ message: "User Information Collected!" });
});
