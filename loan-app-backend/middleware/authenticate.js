
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const express = require('express');
// const router = express.Router();

const authenticate = async (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');


  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    // Verify the token using jwt sec.
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodes the token and extracts user info

    // Attach the decoded user data (like user ID) to the request object
    req.user = decoded;

    //  checking if the user actually exists in the database
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // passing the control to the next middleware
    next();
  } catch (error) {
    // If token is invalid or expired, send an error message
    console.error(error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate; // Export the middleware to use in routes
