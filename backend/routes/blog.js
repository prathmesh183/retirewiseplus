
// Inside your blog.js
app.post("/api/blogs/post", requireAuth, (req, res) => {
  // We add image_url and reference_link to the destructuring
  const { title, content, image_url, reference_link } = req.body;
  
  // Update the SQL to include the new columns
  const sql = "INSERT INTO blogs (title, content, image_url, reference_link) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [title, content, image_url, reference_link], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Blog posted successfully!" });
  });
});
app.get("/api/blogs", (req, res) => {
  const sql = "SELECT * FROM blogs ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});