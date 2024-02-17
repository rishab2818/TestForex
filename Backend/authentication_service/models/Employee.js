/*
Author: Rishab O
Date: 17 Feb 2024
Revision: 001

Explanation:
This module defines a Mongoose schema for the Employee collection in MongoDB.
It includes various fields such as first name, last name, employee ID, position, address, phone number, email, PAN card number, username, and password.
The position field is an integer where:
1 - ADMIN
2 - MANAGER
3 - SALES REP
*/

const mongoose = require('mongoose');

// Define the schema for the Employee collection
const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    employeeId: { type: String, required: true },
    position: { type: Number, required: true }, // 1 - ADMIN, 2 - MANAGER, 3 - SALES REP
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    panCardNumber: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

// Export the Mongoose model for the Employee collection
module.exports = mongoose.model('Employee', employeeSchema);
