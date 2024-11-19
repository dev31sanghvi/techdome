// models/Loan.js
const mongoose = require('mongoose');

// Define the schema for a loan
const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  term: {
    type: Number, // lets say for ex:Term in weeks
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'defaulted'],
    default: 'active',
  },
  scheduledRepayment: {
    type: Number,
    required: true,
  },
  repayments: [
    {
      amount: Number,
      date: Date,
    },
  ],
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
