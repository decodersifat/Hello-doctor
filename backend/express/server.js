require('dotenv').config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require('./models/user.models');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_CONN_STRING).then(() => {
    console.log("Connected To Database");
}).catch(() => {
    console.log("Connection Failed");
});

app.post('/api/signup', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
