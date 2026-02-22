// middleware/requireAuth.js - add cookie fallback
const jwt = require("jsonwebtoken");

module.exports = function requireAuth(req, res, next) {
  // Accept token from Authorization header OR cookie
  const header = req.headers.authorization?.split(' ')[1];
  const cookie = req.cookies?.adminToken;
  const token  = header || cookie;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};