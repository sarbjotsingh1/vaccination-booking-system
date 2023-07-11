const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      } catch (error) {
        throw new Error(error);
      }
    } else {
      throw new Error("Token not provided");
    }
  } else {
    throw new Error("No token attached to the header");
  }
};

const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role != "admin") {
    throw error("You are not admin");
  } else {
    next();
  }
};

module.exports = { authMiddleware, isAdmin };
