const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.userId);
        if (!user) {
          return res.status(401).json({ message: "inValid User" });
        }
        req.user = user;
        next();
      } else {
        return res.status(401).json({ message: "Token not provided" });
      }
    } else {
      return res.status(401).json({ message: "No token is attched to header" });
    }
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authMiddleware };

const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (!adminUser.isAdmin) {
    return res
      .status(403)
      .json({ message: "You are not authorized as an admin" });
  } else {
    next();
  }
};

module.exports = { authMiddleware, isAdmin };
