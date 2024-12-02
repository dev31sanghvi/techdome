const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// route for Register
router.post("/register", async (req, res) => {
  const { name, email, password ,role} = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });

    //verifying the role
    if (!["customer", "admin"].includes(role)) {
      console.log("Invalid role :",role);
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("error during registration",error);
    res.status(500).json({ message: "Something is up with the server", error });
  }
});

// route for Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(FormData);
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
