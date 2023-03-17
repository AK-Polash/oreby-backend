const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/user.js");

app.use(express.json());

app.listen(8000, () => {
  console.log("PORT IS RUNNING");
});

app.get("/", (req, res) => {
  const data = [
    {
      name: "AK Polash",
      phone: "01743713200",
    },
    {
      name: "Emon Islam",
      phone: "01623933474",
    },
    {
      name: "MK Mehedi",
      phone: "01910648064",
    },
  ];

  res.send(data);
});
