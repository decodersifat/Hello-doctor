require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_CONN_STRING).then(() => {
        console.log("Connected To Database");
    }).catch((error) => {
        console.log(error);
    });
};

module.exports = connectDB;