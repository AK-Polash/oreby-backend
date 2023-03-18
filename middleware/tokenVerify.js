const jwt = require("jsonwebtoken");

const tokenVerify = (req, res, next) => {
  jwt.verify(req.headers.authorization, "boom", (err, decode) => {
    if (err) {
      return res.send({ message: "Unauthorized Entry!" });
    } else {
      if (decode.passCode === "nothingElseMatters") {
        return next();
      } else {
        res.send({ message: "Authorization Changed!" });
      }
    }
  });
};

module.exports = tokenVerify;
