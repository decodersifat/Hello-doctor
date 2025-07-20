const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { model } = require("mongoose");

const signup = async (req, res) => {
    const { fname, lname, email, password, phone, gender } = req.body;

    try {
        const existedUser = await User.findOne({email});

        if(existedUser){
            return res.status(200).json({message:"User already exists"});
        }

        const hashed_pass = await bcrypt.hash(password,10);
        const user = await User.create({
            fname,
            lname,
            email,
            password:hashed_pass,
            phone,
            gender
        });

        const token = generateToken(user._id);
        res.status(200).json({message:"Signup successful", user, token});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const login = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user){
            res.status(500).json({
                message: "User not found"
            });
        }

        const passMatchflag = await bcrypt.compare(password, user.password);
        if(!passMatchflag){
            return res.status(401).json({
                message:"Invalid credentials"
            });
            
        };
        const token = generateToken(user._id);
        res.status(200).json({
                message:"Login successfull",
                user,
                token
        });
    
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

module.exports = {
  signup,
  signin: login, 
  
};