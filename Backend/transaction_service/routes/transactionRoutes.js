/*
Author: Rishab O
Date: 17 Feb 2024
Revision: 001

Explanation:
This module defines routes for handling transactions.
*/

// Import required modules
const express = require('express');
const dayjs = require('dayjs'); // Import dayjs library
const router = express.Router();
const Transaction = require('../models/Transaction');

// POST /transactions - Create a new transaction
router.post('/', async (req, res) => {
  try {
    // Destructure request body
    const {
      amount,
      currencyFrom,
      currencyTo,
      exchangeRateFrom,
      exchangeRateTo,
      isCash,
      clientId,
      transactionTime
    } = req.body;

    // Validate required fields
    if (!amount || !currencyFrom || !currencyTo || !exchangeRateFrom || !exchangeRateTo || typeof isCash !== 'boolean' || !clientId) {
      return res.status(400).json({ message: 'Missing or invalid fields in request body' });
    }

    // Create a new transaction
    const newTransaction = new Transaction({
      amount,
      currencyFrom,
      currencyTo,
      exchangeRateFrom,
      exchangeRateTo,
      isCash,
      clientId,
      transactionTime,
      serverTime: dayjs().unix() // Set current Unix timestamp for server time
    });

    // Save the new transaction to the database
    await newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /transactions/:clientId - Retrieve transactions for a specific client
router.get('/:clientId', async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // Find transactions for the specified client ID
    const clientTransactions = await Transaction.find({ clientId });

    res.status(200).json(clientTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
