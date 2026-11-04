

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const router = express.Router();

// Admin Registration API
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must contain at least 8 characters'
            });
        }

        const existingAdmin = await Admin.findOne({
            $or: [{ email }, { username }]
        });

        if (existingAdmin) {
            return res.status(409).json({
                message: 'Admin already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword
        });

        await newAdmin.save();

        res.status(201).json({
            message: 'Admin registered successfully!'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
});
// Admin Login API
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        // Find admin
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful!',
            token: token,
            admin: {
                username: admin.username,
                email: admin.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
});
module.exports = router;