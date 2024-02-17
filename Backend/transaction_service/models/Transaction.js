/*
Author: Rishab O
Date: 17 Feb 2024
Revision: 001

Explanation:
This module defines a Mongoose schema for the Transaction collection in MongoDB.
*/

const mongoose = require('mongoose');
const dayjs = require('dayjs');

// Define the schema for the Transaction collection
const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currencyFrom: { type: String, required: true }, // From currency
  currencyTo: { type: String, required: true }, // To currency
  exchangeRateFrom: { type: Number, required: true }, // Exchange rate for from currency
  exchangeRateTo: { type: Number, required: true }, // Exchange rate for to currency
  isCash: { type: Boolean, required: true }, // Boolean indicating if the transaction was cash or online
  clientId: { type: Number, required: true }, // Reference to the client
  transactionTime: { type: Number, default: () => dayjs().unix() }, // Transaction time in Unix timestamp format
  serverTime: { type: Number, default: () => dayjs().unix() } // Server time in Unix timestamp format
});

// Create a Mongoose model for the Transaction collection
const Transaction = mongoose.model('Transaction', transactionSchema);

// Export the Transaction model
module.exports = Transaction;
