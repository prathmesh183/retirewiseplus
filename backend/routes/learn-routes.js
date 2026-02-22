// ========================
// ADD THESE TO YOUR app.js
// ========================

const { lessons, lessonOrder } = require('./config/lessons-config');

// Learn hub - shows all modules
app.get('/learn', (req, res) => {
  res.render('learn/learn-hub');
});

// Individual lesson pages
app.get('/learn/:slug', (req, res) => {
  const slug = req.params.slug;
  const lesson = lessons[slug];

  if (!lesson) {
    return res.status(404).send(`
      <div style="text-align:center; padding:5rem; font-family:sans-serif;">
        <h1>Lesson Not Found</h1>
        <p>This lesson doesn't exist yet.</p>
        <a href="/learn">← Back to Academy</a>
      </div>
    `);
  }

  res.render('learn/learn-module', { lesson });
});
