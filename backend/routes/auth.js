const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/connection");
const router = express.Router();

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  const { name, email, phone, locality, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, phone, locality, password) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [name, email, phone, locality, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: "Email already exists" });
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "User registered successfully!" });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during signup" });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = results[0];

    // DEBUGGING LOGS: Check your terminal after trying to login
    console.log("--- Login Attempt ---");
    console.log("Email:", email);
    console.log("Stored Hash in DB:", user.password);
    console.log("Hash Length:", user.password.length); // Should be 60

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match?:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ 
        message: "Login successful", 
        token,
        role: user.role,
        user: { name: user.name, email: user.email, role: user.role }
    });
  });
});

module.exports = router;