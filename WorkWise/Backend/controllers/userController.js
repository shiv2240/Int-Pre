const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User.js");

module.exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User added Successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error with signup", err });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });
    res.json({ message: "Your token", token });
  } catch (err) {
    res.status(500).json({ message: "Unable to Login", err });
  }
};
