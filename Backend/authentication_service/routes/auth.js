/*
Author: Rishab O
Date: 17 Feb 2024
Revision: 001

Explanation:
This module defines authentication routes for signing up and logging in employees.
It uses bcryptjs for hashing passwords and comparing hashed passwords for authentication.
*/

// Import required modules
const express = require('express');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');

// Create an Express router instance
const router = express.Router();

// Route for employee signup
router.post('/signup', async (req, res) => {
    try {
        // Check if any required fields are missing or empty
        const requiredFields = ['firstName', 'lastName', 'employeeId', 'address', 'phoneNumber', 'email', 'panCardNumber', 'username', 'password', 'position'];
        for (const field of requiredFields) {
            if (!req.body[field] || req.body[field].trim() === '') {
                return res.status(400).send(`Missing or empty value for field: ${field}`);
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new employee
        const employee = new Employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            employeeId: req.body.employeeId,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            panCardNumber: req.body.panCardNumber,
            username: req.body.username,
            password: hashedPassword,
            position: req.body.position,
        });
        
        // Save the new employee to the database
        await employee.save();
        res.status(201).send('Employee signed up successfully');
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Error signing up');
    }
});

// Route for employee login
router.post('/login', async (req, res) => {
    try {
        // Find the employee by username
        const employee = await Employee.findOne({ username: req.body.username });
        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(req.body.password, employee.password);
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }

        // Respond with success message
        res.status(200).send('Login successful');
    } catch (error) {
        // Handle errors
        res.status(500).send('Error logging in');
    }
});

// Export the router
module.exports = router;
