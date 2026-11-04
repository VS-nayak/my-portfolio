const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
    
require('dotenv').config();

// Use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(cors());
app.use(express.json());

// Connect Contact Routes
app.use('/api/contact', contactRoutes);

// Connect Admin Routes
app.use('/api/admin', adminRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send('Portfolio Backend Server is Running!');
});

// Test API
app.get('/api/test', (req, res) => {
    res.json({
        message: 'Hello from Backend!',
        status: 'Success'
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB Connected Successfully!');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log('MongoDB Connection Error:', error.message);
    }
}

startServer();