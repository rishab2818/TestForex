/*
Author: Rishab O
Date: 17 Feb 2024
Revision: 001

Explanation:
This script sets up an Express.js server with middleware and routes for authentication.
*/

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');

// Create an Express application instance
const app = express();

// Middleware
// Parses incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
// Mounts the authRoutes middleware at the root path '/'
app.use('/', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
