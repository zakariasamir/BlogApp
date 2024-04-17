const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET;
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1800s",
    });
    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Login Successful", token: token });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "User or email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ success: true, message: "Successfully registered" });
  } catch (error) {
    console.error("Error signing up:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const destroy = async (req, res) => {
  try {
    res.clearCookie("token").json({ message: "Logout Successful" });
  } catch (error) {
    console.error("Error logging out:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  destroy,
};
