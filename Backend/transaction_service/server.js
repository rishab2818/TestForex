/*
Author: Rishab O
Date: 17 Feb 2024
Revision: 001

Explanation:
This script sets up an Express.js server to handle transaction-related routes.
It connects to a MongoDB database using Mongoose.
*/

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoutes');

// Create an Express application instance
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Parses incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.json());

// Routes
// Mounts the transactionRoutes middleware at the '/transactions' path
app.use('/transactions', transactionRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://rishabo:rishabo@cluster0.bmemjvg.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
