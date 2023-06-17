/* eslint-disable no-undef */
const express = require("express");
const cookie = require("cookie");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User.js");

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Validate the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the user is an admin (You can modify this logic based on your requirements)
    const isAdmin = user.isAdmin;

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    // Store the token and isAdmin as cookies
    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600, // 1 hour (in seconds)
      path: "/", // Set the cookie path to the root
    };

    res.setHeader("Set-Cookie", [
      cookie.serialize("jwt", token, cookieOptions),
      cookie.serialize("isAdmin", String(isAdmin), cookieOptions),
    ]);

    return res.status(200).json({ token, isAdmin });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  // Clear the authentication token from client-side (e.g., cookies, local storage)

  // Assuming you are using JWT and have a token stored in a cookie
  res.clearCookie("jwt");

  // Send a response indicating successful logout
  res.json({ message: "Logout successful" });
});

// User signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
