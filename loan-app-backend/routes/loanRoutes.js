// routes/loanRoutes.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Loan = require('../models/Loan'); 

// Route to create a loan
router.post('/create', authenticate, async (req, res) => {
  try {
    // Get loan data from the request body
    const { amount, term } = req.body;

    // Create a new loan document
    const loan = new Loan({
      user: req.user.id, // Associate the loan with the authenticated user
      amount,
      term,
      status: 'PENDING',
      repayments: [],
    });

    // Save the loan to the database
    await loan.save();

    res.status(201).json({ message: 'Loan created successfully', loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating loan' });
  }
});

// Route to get loans for the authenticated user
router.get('/myloans', authenticate, async (req, res) => {
  try {

    const loans = await Loan.find({ user: req.user.id });
    res.status(200).json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching loans' });
  }
});


module.exports = router;
