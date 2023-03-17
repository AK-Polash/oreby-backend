const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://Polash:plumbum7@cluster0.srdzrgk.mongodb.net/oreby?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected!"));
};

module.exports = dbConnection;
