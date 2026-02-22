/**
 * middleware/requireAdminPage.js
 * Protects browser-visited admin page routes.
 * Reads token from cookie (set during admin login) instead of Authorization header.
 */
const jwt = require("jsonwebtoken");

module.exports = function requireAdminPage(req, res, next) {
  const token = req.cookies?.adminToken;
  if (!token) return res.redirect('/admin-login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.redirect('/admin-login');
    req.user = decoded;
    next();
  } catch (err) {
    res.clearCookie('adminToken');
    return res.redirect('/admin-login');
  }
};
