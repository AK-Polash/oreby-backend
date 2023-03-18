const express = require("express");
const app = express();
const database = require("./config/db.js");
const User = require("./model/user.js");
const jwt = require("jsonwebtoken");
const tokenVerify = require("./middleware/tokenVerify");

app.use(express.json());

database();

// let tkn = jwt.sign({ passCode: "nothingElseMatters" }, "boom");
// console.log(tkn);

app.listen(8000, () => {
  console.log("PORT IS RUNNING");
});

app.post("/", (req, res) => {
  const { name, email, password, gender } = req.body;
  const user = new User({
    name,
    email,
    password,
    gender,
  });

  user.save();

  let token = jwt.sign({ email: user.email }, "kire");
  console.log(token);

  res.send(user);
});

app.post("/verification", async (req, res) => {
  let decode = jwt.verify(req.headers.authorization, "kire");
  let item = await User.find({ email: decode.email });

  if (item[0].verified === true) {
    res.send({ message: "Email Already verified!" });
  } else {
    await User.findOneAndUpdate(
      { email: decode.email },
      { verified: true },
      { new: true }
    );
    res.send({ message: "Your account has been verified!" });
  }
});

app.get("/users", tokenVerify, async (req, res) => {
  let users = await User.find({});
  res.send(users);
});
