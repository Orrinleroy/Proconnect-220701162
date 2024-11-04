// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb'); // Use the native MongoDB driver
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

// Connect to MongoDB
client.connect()
    .then(() => {
        db = client.db('studentDB'); // Specify the database to use
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.collection('students').findOne({ username }); // Use native driver to find user

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Unauthorized: Invalid credentials' });
        }

        // Successful login
        res.json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});