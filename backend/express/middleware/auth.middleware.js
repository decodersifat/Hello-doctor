const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const protect = async (req, res, next) => {
  const token = req.cookies.token; // ✅ Get token from cookie

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next(); // ✅ Auth success, continue to route
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;
