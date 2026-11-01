const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
  try {
    // Token from Bearer header OR cookie
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Please login to access resources" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // mongoose doc → req.user._id, req.user.name, etc.
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};