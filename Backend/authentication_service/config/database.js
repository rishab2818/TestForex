/*
Author: Rishab O
Date: 17 Feb 2024
Revision: 001

Explanation:
This module connects to MongoDB using Mongoose, an elegant MongoDB object modeling for Node.js.
*/

const mongoose = require('mongoose');

// Async function to connect to MongoDB
const connectDB = async () => {
    try {
        // Use Mongoose to connect to the MongoDB database
        await mongoose.connect('mongodb+srv://rishabo:rishabo@cluster0.bmemjvg.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        // Log any errors that occur during the connection process
        console.error('MongoDB connection error:', error);
        // Exit the process with a non-zero status code to indicate failure
        process.exit(1);
    }
};

// Export the connectDB function to be used in other modules
module.exports = connectDB;
