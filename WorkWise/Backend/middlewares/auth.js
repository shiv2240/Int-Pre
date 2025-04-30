const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ message: "Token is required" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_TOKEN);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token", err });
  }
};

module.exports = authenticate;
