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

app.post("/", async (req, res) => {
  const { name, email, password, gender } = req.body;
  const data = await User.find({ email: email });

  const user = new User({
    name,
    email,
    password,
    gender,
  });

  if (data.length > 0 && email === data[0].email) {
    return res.send({ message: "User Already Exist!" });
  } else {
    user.save();
    res.send({ message: "Registration Successfull!" });

    let token = jwt.sign({ email: user.email }, "kire");
    console.log(token);
  }
});

app.post("/verification", async (req, res) => {
  const decode = jwt.verify(req.headers.authorization, "kire");
  const data = await User.find({ email: decode.email });

  if (data[0].verified === true) {
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
  const users = await User.find({});
  res.send(users);
});
