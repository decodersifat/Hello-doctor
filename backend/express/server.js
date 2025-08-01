require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const app = express();
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true               
}));
app.use(express.json());


app.use("/api/v1/auth", authRoutes);

connectDB();
app.listen(3000, () => console.log("Server running on port 3000"));
