const express = require('express');
const routes = express.Router();
const User = require("../models/user.models")


routes.post('/signup', async (req, res) => {
    try {
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email_pattern.test(req.body.email)) {
            const user = await User.create(req.body);
            return res.status(200).json({
                message: "User created successfully",
                user
            });
           
        }

        else{
             return res.status(400).json({ message: "Your email is not a valid email" });
        }



    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



routes.get('/profile/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = routes;