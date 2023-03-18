const jwt = require("jsonwebtoken");

const tokenVerify = (req, res, next) => {
  jwt.verify(req.headers.authorization, "boom", (err, decode) => {
    if (err) {
      return res.send({ message: "Unauthorized Entry!" });
    } else {
      next();
    }
  });
};

module.exports = tokenVerify;
