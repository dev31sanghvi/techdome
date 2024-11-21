
const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const authenticate = require('../middleware/authenticate');




// GET /loans: Fetch loan details for the authenticated user
router.get('/loans', authenticate, async (req, res) => {
  try {

    const loan = await Loan.findOne({ userId: req.user.id });

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.json(loan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch loan details' });
  }
});

// POST /repayments: Submit a repayment for the loan
router.post('/repayments', authenticate, async (req, res) => {
    // getting repayment amt from req. body
  const { amount } = req.body;

  try {
    const loan = await Loan.findOne({ userId: req.user.id });

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    if (amount < loan.scheduledRepayment) {
      return res.status(400).json({ message: 'Repayment amount is too low' });
    }

    // Add repayment to the loan's repayments array
    loan.repayments.push({
      amount,
      date: new Date(),
    });

    //  Updating loan status if it's fully paid
    if (loan.amount <= loan.repayments.reduce((total, repayment) => total + repayment.amount, 0)) {
      loan.status = 'completed';
    }


    await loan.save();

    res.status(200).json({ message: 'Repayment successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit repayment' });
  }
});

module.exports = router;
