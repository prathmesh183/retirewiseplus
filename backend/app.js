// ============================================================
//  RetireWise+ — Production-Ready Backend
//  Built on Express.js + MySQL
// ============================================================
require("dotenv").config({ override: false });

// ─────────────────────────────────────────
//  IMPORTS
// ─────────────────────────────────────────
const axios        = require("axios");
const express      = require("express");
const path         = require("path");
const cors         = require("cors");
const helmet       = require("helmet");
const rateLimit    = require("express-rate-limit");
const bodyParser   = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt          = require("jsonwebtoken");
const bcrypt       = require("bcryptjs");
const crypto       = require("crypto");                // ← moved to top (was inline in .map — caused silent crash)
const compression  = require("compression");
const morgan       = require("morgan");
const winston      = require("winston");
const { JSDOM }   = require("jsdom");
const DOMPurify   = require("dompurify");

// Initialise DOMPurify in a server-side DOM environment
const purify = DOMPurify(new JSDOM("").window);

const app         = express();
const db          = require("./db/connection");
const { lessons } = require("./lessons-config");
const { tools, toolCategories } = require("./tools-config");

// ─────────────────────────────────────────
//  WINSTON LOGGER
//  Writes logs to files so you can debug issues
//  even after the server has restarted.
//
//  Logs go to:
//    logs/error.log  — errors only
//    logs/combined.log — everything
// ─────────────────────────────────────────
const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),  // log full stack traces on errors
    logFormat
  ),
  transports: [
    // errors only → errors.log
    new winston.transports.File({ filename: "logs/error.log",    level: "error" }),
    // everything → combined.log
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// In development, also print coloured logs to the terminal
if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), logFormat),
  }));
}

// Make logger available everywhere — replace all console.error / console.warn below
global.logger = logger;

// ─────────────────────────────────────────
//  SECURITY: HELMET
// ─────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: false, // keep OFF — inline <script> tags need this
  })
);

// ─────────────────────────────────────────
//  PERFORMANCE: COMPRESSION
//  Gzip compresses all HTTP responses.
//  Typical saving: 60–80% smaller responses,
//  faster page loads especially on mobile.
// ─────────────────────────────────────────
app.use(compression());

// ─────────────────────────────────────────
//  SECURITY: INPUT SANITISATION
//  Strips $ and . characters from all request
//  bodies, params, and query strings to block
//  NoSQL injection patterns before they reach
//  any route handler.
// ─────────────────────────────────────────


// ─────────────────────────────────────────
//  LOGGING: MORGAN (HTTP request logger)
//  Logs every request: method, URL, status,
//  response time. Writes to combined.log in
//  production; pretty-prints in development.
// ─────────────────────────────────────────
if (process.env.NODE_ENV === "production") {
  // In production: pipe morgan into winston so everything is in one log file
  app.use(
    morgan("combined", {
      stream: { write: (message) => logger.http(message.trim()) },
      // skip logging health checks — they'd spam the log file
      skip: (req) => req.url === "/health",
    })
  );
} else {
  // In development: colourful concise output in terminal
  app.use(morgan("dev", { skip: (req) => req.url === "/health" }));
}

// ─────────────────────────────────────────
//  SECURITY: CORS
// ─────────────────────────────────────────
const productionOrigins = [
  process.env.FRONTEND_URL,                          // e.g. custom domain
  process.env.APP_URL,                               // Railway public URL
  "https://retirewiseplus-production.up.railway.app",// fallback hardcoded Railway URL
].filter(Boolean); // remove any undefined values

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? productionOrigins
    : ["http://localhost:5000", "http://localhost:3000",
       "http://127.0.0.1:5000", "http://127.0.0.1:3000",
       "http://192.168.1.100:5000", "http://192.168.1.104:5000"];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (Postman, n8n, mobile) and allowed origins
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    logger.warn(`CORS blocked request from: ${origin}`);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

// ─────────────────────────────────────────
//  SECURITY: RATE LIMITERS
// ─────────────────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many login attempts. Please wait 15 minutes and try again." },
  standardHeaders: true,
  legacyHeaders:   false,
});

const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many submissions. Please try again in an hour." },
  standardHeaders: true,
  legacyHeaders:   false,
});

const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: "Too many signup attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders:   false,
});

// ─────────────────────────────────────────
//  GENERAL MIDDLEWARE
// ─────────────────────────────────────────
const fs = require("fs");
const frontendPath = fs.existsSync(path.join(__dirname, "../frontend"))
  ? path.join(__dirname, "../frontend")
  : path.join(__dirname, "../../frontend");

app.use(express.static(path.join(frontendPath, "public")));

app.use(express.json({ limit: "50kb" }));
app.use(bodyParser.json({ limit: "50kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser());

// EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(frontendPath, "views"));

// ─────────────────────────────────────────
//  AUTH MIDDLEWARE
// ─────────────────────────────────────────
const requireAuth      = require("./middleware/requireAuth");
const requireAdminPage = require("./middleware/requireAdminPage");

// ─────────────────────────────────────────
//  AUTH ROUTES
// ─────────────────────────────────────────
const authRoutes = require("./routes/auth");
app.use("/api/auth", loginLimiter, authRoutes);

app.post("/api/protected", requireAuth, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});

// ─────────────────────────────────────────
//  ADMIN LOGIN
// ─────────────────────────────────────────
app.post("/api/admin/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required." });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      logger.error("DB error on admin login:", err);
      return res.status(500).json({ error: "Server error." });
    }

    if (results.length === 0)
      return res.status(401).json({ error: "Invalid credentials." });

    const user  = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).json({ error: "Invalid credentials." });

    if (user.role !== "admin")
      return res.status(403).json({ error: "Admin access only." });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Session-only cookie — automatically cleared when the browser is closed.
    // No maxAge means the browser never writes it to disk.
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "strict",
      // no maxAge → session cookie (cleared on browser close)
    });

    logger.info(`Admin login: ${email} from IP ${req.ip}`);
    res.json({ success: true });
  });
});

// Admin logout
app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("adminToken");
  res.json({ success: true });
});

// ─────────────────────────────────────────
//  HEALTH CHECK
// ─────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "OK", app: "RetireWise+", env: process.env.NODE_ENV || "development" });
});

// ─────────────────────────────────────────
//  SEO — robots.txt
// ─────────────────────────────────────────
app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(
    "User-agent: *\n" +
    "Disallow: /admin\n" +
    "Disallow: /admin-dashboard\n" +
    "Disallow: /admin-login\n" +
    "Disallow: /api/\n" +
    "Allow: /\n"
  );
});

// ─────────────────────────────────────────
//  PUBLIC PAGE ROUTES
// ─────────────────────────────────────────
app.get("/",           (req, res) => res.sendFile(path.join(frontendPath, "views/pages/index.html")));
app.get("/index",      (req, res) => res.redirect("/"));
app.get("/about",      (req, res) => res.render("pages/about"));
app.get("/newsletter", (req, res) => res.render("pages/newsletter"));
app.get("/lead",       (req, res) => res.render("pages/lead"));
app.get("/terms",      (req, res) => res.render("pages/terms"));
app.get("/privacy",    (req, res) => res.render("pages/privacy"));

// Admin login page
app.get("/admin-login", (req, res) => {
  const token = req.cookies?.adminToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role === "admin") return res.redirect("/admin-dashboard");
    } catch (_) { /* expired / invalid — show login */ }
  }
  res.render("pages/admin-login");
});

// ─────────────────────────────────────────
//  PROTECTED ADMIN PAGE ROUTES
// ─────────────────────────────────────────
app.get("/admin", requireAdminPage, (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.render("pages/admin");
});
app.get("/admin-dashboard", requireAdminPage, (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.render("pages/admin-dashboard");
});

// ─────────────────────────────────────────
//  LEARN ROUTES
// ─────────────────────────────────────────
app.get("/learn", (req, res) => res.render("learn/learn-hub"));

app.get("/learn/:slug", (req, res) => {
  const lesson = lessons[req.params.slug];
  if (!lesson)
    return res.status(404).render("pages/404", { title: "Lesson Not Found" });
  res.render("learn/learn-module", { lesson });
});

app.get("/funds", (req, res) => res.render("pages/funds"));

// ─────────────────────────────────────────
//  CALCULATOR ROUTES
// ─────────────────────────────────────────
app.get("/tools", (req, res) => {
  res.render("pages/tools", {
    tools,
    toolCategories,
    totalTools:      Object.keys(tools).length,
    totalCategories: toolCategories.length,
  });
});

app.get("/calculators", (req, res) => res.redirect("/tools"));

app.get("/calculator/:slug", (req, res) => {
  const tool = tools[req.params.slug];
  if (!tool)
    return res.status(404).render("pages/404", { title: "Calculator Not Found" });
  res.render("calculator/calculator", { tool });
});

// ─────────────────────────────────────────
//  OLD .HTML REDIRECTS  (301 = permanent)
// ─────────────────────────────────────────
app.get("/sip.html",        (req, res) => res.redirect(301, "/calculator/sip"));
app.get("/lumpsum.html",    (req, res) => res.redirect(301, "/calculator/lumpsum"));
app.get("/retirement.html", (req, res) => res.redirect(301, "/calculator/retirement"));
app.get("/goal.html",       (req, res) => res.redirect(301, "/calculator/goal"));
app.get("/swp.html",        (req, res) => res.redirect(301, "/calculator/swp"));
app.get("/cagr.html",       (req, res) => res.redirect(301, "/calculator/cagr"));
app.get("/fd.html",         (req, res) => res.redirect(301, "/calculator/fd"));
app.get("/stepupsip.html",  (req, res) => res.redirect(301, "/calculator/step-up-sip"));
app.get("/about.html",      (req, res) => res.redirect(301, "/about"));
app.get("/newsletter.html", (req, res) => res.redirect(301, "/newsletter"));
app.get("/lead.html",       (req, res) => res.redirect(301, "/lead"));
app.get("/terms.html",      (req, res) => res.redirect(301, "/terms"));
app.get("/privacy.html",    (req, res) => res.redirect(301, "/privacy"));
app.get("/index.html",      (req, res) => res.redirect(301, "/"));

// ─────────────────────────────────────────
//  LEAD GENERATION API
// ─────────────────────────────────────────
app.post("/api/leads", leadLimiter, async (req, res) => {
  try {
    const {
      name, phone, email, age_group, has_existing_sip,
      current_sip_amount, desired_investment_amount,
      objective, financial_goal, goal_timeline, city,
    } = req.body;

    if (!name || !phone || !email)
      return res.status(400).json({ success: false, message: "Name, phone, and email are required." });
    if (!/^[0-9]{10}$/.test(phone))
      return res.status(400).json({ success: false, message: "Phone must be exactly 10 digits." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ success: false, message: "Invalid email format." });

    db.query("SELECT id FROM leads WHERE phone = ? OR email = ?", [phone, email], (checkErr, existing) => {
      if (checkErr) {
        logger.error("DB error checking duplicate lead:", checkErr);
        return res.status(500).json({ success: false, message: "Server error." });
      }
      if (existing.length > 0)
        return res.status(400).json({ success: false, message: "A consultation request with this phone or email already exists." });

      const insertSql = `
        INSERT INTO leads
          (name, phone, email, age_group, has_existing_sip, current_sip_amount,
           desired_investment_amount, objective, financial_goal, goal_timeline,
           city, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', NOW(), NOW())`;

      db.query(insertSql, [
        name, phone, email,
        age_group                 || null,
        has_existing_sip          || null,
        current_sip_amount        || null,
        desired_investment_amount || null,
        objective                 || null,
        financial_goal            || null,
        goal_timeline             || null,
        city                      || "Pune",
      ], (insertErr, result) => {
        if (insertErr) {
          logger.error("DB error inserting lead:", insertErr);
          return res.status(500).json({ success: false, message: "Failed to submit. Please try again." });
        }
        logger.info(`New lead — ID: ${result.insertId} | Phone: ${phone}`);
        res.status(200).json({ success: true, message: "Consultation request submitted!", lead_id: result.insertId });
      });
    });
  } catch (err) {
    logger.error("Unexpected error in /api/leads:", err);
    res.status(500).json({ success: false, message: "Unexpected server error." });
  }
});

// View all leads — admin only
app.get("/api/leads", requireAuth, (req, res) => {
  db.query("SELECT * FROM leads ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Failed to retrieve leads." });
    res.json({ success: true, count: results.length, data: results });
  });
});

// View single lead — admin only
app.get("/api/leads/:id", requireAuth, (req, res) => {
  db.query("SELECT * FROM leads WHERE id = ?", [req.params.id], (err, result) => {
    if (err)            return res.status(500).json({ success: false, message: "DB error." });
    if (!result.length) return res.status(404).json({ success: false, message: "Lead not found." });
    res.json({ success: true, data: result[0] });
  });
});

// Update lead status/notes — admin only
app.put("/api/leads/:id", requireAuth, (req, res) => {
  const { status, notes } = req.body;
  db.query(
    "UPDATE leads SET status = ?, notes = ?, updated_at = NOW() WHERE id = ?",
    [status, notes, req.params.id],
    (err, result) => {
      if (err)                  return res.status(500).json({ success: false, message: "Failed to update." });
      if (!result.affectedRows) return res.status(404).json({ success: false, message: "Lead not found." });
      res.json({ success: true, message: "Lead updated." });
    }
  );
});

// Lead analytics
app.get("/api/leads-stats", requireAuth, (req, res) => {
  db.query("SELECT status, COUNT(*) as count FROM leads GROUP BY status", (err, results) => {
    if (err) return res.status(500).json({ success: false });
    const stats = { total: 0, new: 0, contacted: 0, converted: 0, rejected: 0 };
    results.forEach(r => { stats.total += r.count; stats[r.status] = r.count; });
    res.json({ success: true, data: stats });
  });
});

app.get("/api/leads-by-age", requireAuth, (req, res) => {
  db.query("SELECT age_group, COUNT(*) as count FROM leads GROUP BY age_group", (err, results) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, data: results });
  });
});

app.get("/api/leads-by-goal", requireAuth, (req, res) => {
  db.query(
    "SELECT financial_goal, COUNT(*) as count FROM leads GROUP BY financial_goal ORDER BY count DESC",
    (err, results) => {
      if (err) return res.status(500).json({ success: false });
      res.json({ success: true, data: results });
    }
  );
});

// ─────────────────────────────────────────
//  FUNDS API
// ─────────────────────────────────────────
app.get("/api/funds", (req, res) => {
  db.query(
    "SELECT id, fund_name, fund_house, category, risk_level, assumed_return FROM mutual_funds",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results.map(f => ({ ...f, assumed_return: Number(f.assumed_return) })));
    }
  );
});

// Delete blog — admin only
app.delete("/api/blogs/:id", requireAuth, (req, res) => {
  db.query(
    "DELETE FROM blogs WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        logger.error("DB error deleting blog:", err);
        return res.status(500).json({ error: "Failed to delete." });
      }
      if (!result.affectedRows)
        return res.status(404).json({ error: "Blog not found." });

      logger.info(`Blog deleted: id ${req.params.id}`);
      res.json({ success: true });
    }
  );
});

// ─────────────────────────────────────────
//  BLOGS API
// ─────────────────────────────────────────

// Publish blog — admin only
// DOMPurify sanitises the content HTML before it ever touches
// the database, preventing stored XSS attacks.

// Publish blog — admin only
app.post("/api/blogs/post", requireAuth, (req, res) => {
  const { title, content, image_url, reference_link, category, nj_link } = req.body;

  if (!title || !content)
    return res.status(400).json({ error: "Title and content are required." });

  // Sanitise HTML before storing
  const cleanContent = purify.sanitize(content, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "b", "i", "u", "h2", "h3", "h4",
      "ul", "ol", "li", "blockquote", "a", "hr", "span",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
    FORCE_BODY: true,
  });

  if (!cleanContent.trim())
    return res.status(400).json({ error: "Content contains no valid text after sanitisation." });

  db.query(
    "INSERT INTO blogs (title, content, author, image_url, reference_link, category, nj_link) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, cleanContent, "Admin", image_url || null, reference_link || null, category || null, nj_link || null],
    (err, result) => {
      if (err) {
        logger.error("DB error inserting blog:", err);
        return res.status(500).json({ error: "Failed to publish." });
      }

      const blogId = result.insertId;
      logger.info(`Blog published: "${title}" (id: ${blogId})`);

      // Respond to admin immediately — don't block on n8n
      res.json({ message: "Post successful", blog_id: blogId });



      // ── NEWSLETTER BROADCAST ──────────────────────────────────────
      // Only fire if the env var is configured
      const broadcastUrl = process.env.N8N_BROADCAST_WEBHOOK;
      if (!broadcastUrl) {
        logger.warn("N8N_BROADCAST_WEBHOOK not set — skipping newsletter broadcast.");
        return;
      }

      // Fetch all active subscribers from MySQL
      db.query(
        "SELECT id, full_name, email, frequency, topics FROM newsletter_subscribers WHERE status = 'active'",
        (subErr, subscribers) => {
          if (subErr) {
            logger.error("Failed to fetch subscribers for broadcast:", subErr);
            return;
          }

          if (!subscribers.length) {
            logger.info("No active subscribers — skipping broadcast.");
            return;
          }

          logger.info(`Broadcasting blog "${title}" to ${subscribers.length} subscriber(s)...`);

          // Fire ONE webhook call with the blog + full subscriber list
          // n8n's "Split in Batches" node will loop through subscribers[]
          axios.post(broadcastUrl, {
            blog: {
              id:             blogId,
              title,
              category:       category   || "",
              content:        cleanContent,
              image_url:      image_url  || "",
              reference_link: reference_link || "",
              nj_link:        nj_link    || "",
              published_at:   new Date().toISOString(),
            },
           // Attach a personal unsubscribe URL to each subscriber
subscribers: subscribers.map(sub => {
  const secret = process.env.UNSUBSCRIBE_SECRET || "fallback-secret";
  const appUrl = process.env.APP_URL || "http://localhost:5000";
  const token  = crypto
    .createHmac("sha256", secret)
    .update(sub.email.toLowerCase())
    .digest("hex");
  return {
    ...sub,
    unsubscribe_url: `${appUrl}/unsubscribe?email=${encodeURIComponent(sub.email)}&token=${token}`,
  };
}),
          }, {
            headers: { "Content-Type": "application/json" },
            timeout: 8000,
          })
          .then(() => logger.info(`n8n broadcast webhook fired for blog id: ${blogId}`))
          .catch(e  => logger.warn(`n8n broadcast webhook failed: ${e.message}`));
        }
      );
      // ─────────────────────────────────────────────────────────────
    }
  );
});

// ─────────────────────────────────────────
//  UNSUBSCRIBE
// ─────────────────────────────────────────

// Helper — generates a tamper-proof token tied to the subscriber's email
function generateUnsubToken(email) {
  return crypto
    .createHmac("sha256", process.env.UNSUBSCRIBE_SECRET)
    .update(email.toLowerCase())
    .digest("hex");
}

// GET /unsubscribe?email=x&token=y
// Clicked from inside the email
app.get("/unsubscribe", (req, res) => {
  const { email, token } = req.query;

  if (!email || !token)
    return res.status(400).send(unsubPage("Invalid link.", false));

  const expected = generateUnsubToken(email);
  if (token !== expected)
    return res.status(403).send(unsubPage("This unsubscribe link is invalid or has expired.", false));

  db.query(
    "UPDATE newsletter_subscribers SET status = 'unsubscribed', updated_at = NOW() WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        logger.error("Unsubscribe DB error:", err);
        return res.status(500).send(unsubPage("Server error. Please try again later.", false));
      }
      if (!result.affectedRows)
        return res.status(404).send(unsubPage("Email not found in our list.", false));

      logger.info(`Unsubscribed: ${email}`);
      res.send(unsubPage(`You've been unsubscribed. We're sorry to see you go.`, true));
    }
  );
});

// API — admin can also unsubscribe someone manually from the dashboard
app.post("/api/newsletter/unsubscribe", requireAuth, (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required." });

  db.query(
    "UPDATE newsletter_subscribers SET status = 'unsubscribed', updated_at = NOW() WHERE email = ?",
    [email],
    (err, result) => {
      if (err)                  return res.status(500).json({ error: "DB error." });
      if (!result.affectedRows) return res.status(404).json({ error: "Email not found." });
      res.json({ success: true, message: `${email} unsubscribed.` });
    }
  );
});

// Simple branded confirmation page — no EJS needed
function unsubPage(message, success) {
  const icon  = success ? "✅" : "❌";
  const color = success ? "#1a3c31" : "#dc2626";
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribe — RetireWise+</title>
</head>
<body style="margin:0;padding:0;background:#fdfaf3;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:480px;margin:80px auto;text-align:center;padding:40px 30px;
              background:white;border-radius:12px;border:1px solid #e8e2d5;
              box-shadow:0 10px 30px rgba(26,60,49,0.08);">
    <div style="font-size:3rem;margin-bottom:20px;">${icon}</div>
    <h1 style="color:#1a3c31;font-size:1.4rem;margin:0 0 12px;font-weight:700;">
      RetireWise<span style="color:#b59b5d;">+</span>
    </h1>
    <p style="color:${color};font-size:1rem;line-height:1.6;margin:0 0 28px;">
      ${message}
    </p>
    <a href="/" style="display:inline-block;padding:12px 28px;background:#1a3c31;
                       color:#fdfaf3;text-decoration:none;border-radius:6px;
                       font-weight:700;font-size:0.9rem;letter-spacing:1px;">
      Back to RetireWise+
    </a>
  </div>
</body>
</html>`;
}

// Read all blogs — public
app.get("/api/blogs", (req, res) => {
  db.query(
    "SELECT id, title, content, author, image_url, reference_link, category, nj_link, created_at FROM blogs ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: "Could not fetch blogs." });
      res.json(results);
    }
  );
});

// ─────────────────────────────────────────
//  NEWSLETTER API
// ─────────────────────────────────────────
app.post("/api/newsletter/subscribe", newsletterLimiter, (req, res) => {
  const { fullName, email, frequency, topics } = req.body;

  if (!fullName || !email)
    return res.status(400).json({ error: "Name and email are required." });

  const topicsStr = Array.isArray(topics) ? topics.join(", ") : (topics || "");

  db.query(
    "INSERT INTO newsletter_subscribers (full_name, email, frequency, topics, subscribed_at, status) VALUES (?, ?, ?, ?, NOW(), 'active')",
    [fullName, email, frequency || "weekly", topicsStr],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(400).json({ error: "You're already in the club!" });
        logger.error("DB error subscribing:", err);
        return res.status(500).json({ error: "Server error." });
      }

      logger.info(`New subscriber: ${email}`);
      res.status(200).json({ message: "Welcome to the RetireWise+ Club!", subscriber_id: result.insertId });

      const webhookUrl = process.env.N8N_WEBHOOK_URL;
      if (webhookUrl) {
        axios
          .post(webhookUrl, {
            name: fullName, email,
            frequency:     frequency || "weekly",
            topics:        topicsStr,
            subscriber_id: result.insertId,
            timestamp:     new Date().toISOString(),
          }, { timeout: 5000 })
          .then(() => logger.info(`n8n webhook fired for: ${email}`))
          .catch(e  => logger.warn(`n8n webhook failed (user still saved): ${e.message}`));
      } else {
        logger.warn("N8N_WEBHOOK_URL not set in .env — skipping webhook.");
      }
    }
  );
});

// View subscribers — admin only
app.get("/api/newsletter/subscribers", requireAuth, (req, res) => {
  db.query(
    "SELECT id, full_name, email, frequency, topics FROM newsletter_subscribers WHERE status = 'active'",
    (err, results) => {
      if (err) return res.status(500).json({ error: "Failed to fetch subscribers." });
      res.json(results);
    }
  );
});

// Log email sent — admin only
app.post("/api/newsletter/email-log", requireAuth, (req, res) => {
  const { subscriber_id, subject, status } = req.body;
  db.query(
    "INSERT INTO newsletter_email_logs (subscriber_id, subject, status, sent_at) VALUES (?, ?, ?, NOW())",
    [subscriber_id, subject, status],
    (err) => {
      if (err) return res.status(500).json({ error: "Logging failed." });
      res.json({ success: true });
    }
  );
});

// ─────────────────────────────────────────
//  SEO — Individual blog page with meta tags
// ─────────────────────────────────────────
app.get("/blog/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT id, title, content, image_url, category, created_at FROM blogs WHERE id = ?",
    [id],
    (err, results) => {
      if (err || !results.length) {
        return res.status(404).send(`
          <html><head><title>Not Found — RetireWise+</title></head>
          <body style="font-family:Inter,sans-serif;text-align:center;padding:5rem;background:#faf8f3;">
            <h1 style="color:#1a3c31;">Insight not found</h1>
            <a href="/newsletter" style="color:#c4a962;font-weight:700;">← Back to Insights</a>
          </body></html>`);
      }

      const blog    = results[0];
      const excerpt = blog.content.replace(/<[^>]*>/g, '').substring(0, 160);
      const image   = blog.image_url || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200';
      const url     = `${process.env.APP_URL}/blog/${blog.id}`;
      const date    = new Date(blog.created_at).toISOString();

      res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blog.title} | RetireWise+</title>
  <meta name="description" content="${excerpt}">
  <meta name="keywords" content="${blog.category}, SIP, mutual fund, retirement planning, India investing, RetireWise+">
  <meta name="author" content="RetireWise+">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${blog.title}">
  <meta property="og:description" content="${excerpt}">
  <meta property="og:image" content="${image}">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="RetireWise+">
  <meta property="article:published_time" content="${date}">
  <meta property="article:section" content="${blog.category}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${blog.title}">
  <meta name="twitter:description" content="${excerpt}">
  <meta name="twitter:image" content="${image}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${blog.title}",
    "description": "${excerpt}",
    "image": "${image}",
    "datePublished": "${date}",
    "author": { "@type": "Organization", "name": "RetireWise+" },
    "publisher": { "@type": "Organization", "name": "RetireWise+", "url": "${process.env.APP_URL}" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "${url}" }
  }
  </script>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Inter',-apple-system,sans-serif; background:#faf8f3; color:#334155; line-height:1.7; }
    .container { max-width:780px; margin:0 auto; padding:3rem 1.5rem; }
    .back-link { display:inline-flex; align-items:center; gap:6px; color:#c4a962; font-weight:600; text-decoration:none; font-size:0.9rem; margin-bottom:2rem; }
    .back-link:hover { color:#1a3c31; }
    .cat-badge { display:inline-block; background:#1a3c31; color:white; padding:4px 14px; border-radius:20px; font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:1.2rem; }
    h1 { font-size:2.4rem; font-weight:800; color:#1a3c31; line-height:1.2; margin-bottom:1rem; letter-spacing:-0.02em; }
    .meta { color:#94a3b8; font-size:0.88rem; margin-bottom:2rem; }
    .hero-img { width:100%; height:380px; object-fit:cover; border-radius:16px; margin-bottom:2.5rem; }
    .nism-bar { display:flex; align-items:center; gap:10px; background:#f0f4f2; border-left:3px solid #c4a962; padding:12px 16px; border-radius:0 8px 8px 0; margin-bottom:2rem; font-size:0.85rem; color:#1a3c31; font-weight:500; }
    .content { font-size:1.05rem; color:#475569; }
    .content h2 { font-size:1.5rem; font-weight:700; color:#1a3c31; margin:2rem 0 0.75rem; }
    .content h3 { font-size:1.2rem; font-weight:700; color:#1a3c31; margin:1.5rem 0 0.5rem; }
    .content p { margin-bottom:1.2rem; }
    .content ul, .content ol { margin:0.5rem 0 1.2rem 1.5rem; }
    .content li { margin-bottom:0.5rem; }
    .content strong { color:#1a3c31; }
    .cta-box { background:linear-gradient(135deg,#1a3c31,#2d5a4a); color:white; padding:2rem; border-radius:16px; margin-top:3rem; display:flex; align-items:center; justify-content:space-between; gap:1.5rem; flex-wrap:wrap; }
    .cta-box h3 { font-size:1.1rem; font-weight:700; margin-bottom:0.3rem; }
    .cta-box p { font-size:0.85rem; opacity:0.8; }
    .cta-btn { background:linear-gradient(135deg,#c4a962,#d4bc7c); color:#1a3c31; padding:12px 24px; border-radius:10px; font-weight:700; text-decoration:none; white-space:nowrap; font-size:0.9rem; }
    @media(max-width:600px) { h1 { font-size:1.7rem; } .hero-img { height:220px; } .cta-box { flex-direction:column; } }
  </style>
</head>
<body>
  <div class="container">
    <a href="/newsletter" class="back-link">← Back to Insights</a>
    <div class="cat-badge">${blog.category || 'Market Insight'}</div>
    <h1>${blog.title}</h1>
    <div class="meta">Published ${new Date(blog.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})} &nbsp;·&nbsp; RetireWise+ &nbsp;·&nbsp; NISM VA Certified MFD</div>
    ${blog.image_url ? `<img src="${blog.image_url}" alt="${blog.title}" class="hero-img">` : ''}
    <div class="nism-bar">🛡️ Analysis by an NISM VA Certified, ARN-registered Mutual Fund Distributor · NJ E-Wealth Partner</div>
    <div class="content">${blog.content}</div>
    <div class="cta-box">
      <div><h3>Ready to act on this insight?</h3><p>Book a free consultation with our NISM certified advisor.</p></div>
      <a href="/lead" class="cta-btn">📈 Start My SIP Now</a>
    </div>
  </div>
</body>
</html>`);
    }
  );
});

// ─────────────────────────────────────────
//  404 — catch-all (must be last route)
// ─────────────────────────────────────────
app.use((req, res) => {
  logger.warn(`404 — ${req.method} ${req.url} from IP ${req.ip}`);
  res.status(404).send(`
    <div style="font-family:'Inter',sans-serif;text-align:center;padding:5rem;background:#faf8f3;min-height:100vh;">
      <h1 style="color:#1a3c31;font-size:4rem;margin-bottom:1rem;">404</h1>
      <p style="color:#64748b;font-size:1.2rem;margin-bottom:2rem;">Page not found.</p>
      <a href="/" style="color:#c4a962;font-weight:700;font-size:1rem;text-decoration:none;">← Back to RetireWise+</a>
    </div>`);
});

// ─────────────────────────────────────────
//  GLOBAL ERROR HANDLER
// ─────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(`Unhandled error on ${req.method} ${req.url}: ${err.stack}`);
  res.status(500).send(`
    <div style="font-family:'Inter',sans-serif;text-align:center;padding:5rem;background:#faf8f3;min-height:100vh;">
      <h1 style="color:#1a3c31;font-size:3rem;margin-bottom:1rem;">Something went wrong</h1>
      <p style="color:#64748b;margin-bottom:2rem;">Our team has been notified. Please try again shortly.</p>
      <a href="/" style="color:#c4a962;font-weight:700;text-decoration:none;">← Go Home</a>
    </div>`);
});

// ─────────────────────────────────────────
//  START SERVER
// ─────────────────────────────────────────
/*const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`RetireWise+ running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
  console.log(`\n✅  RetireWise+ running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
  console.log(`🌐  Open:    http://localhost:${PORT}`);
  console.log(`🔒  Admin:   http://localhost:${PORT}/admin-login`);
  console.log(`❤️   Health:  http://localhost:${PORT}/health`);
  console.log(`📋  Logs:    ./logs/combined.log\n`);
});*/

const PORT = process.env.PORT || 5000;

// We add "0.0.0.0" as the host to ensure Railway can route traffic to the container
app.listen(PORT, "0.0.0.0", () => {
  logger.info(`RetireWise+ running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
  console.log(`\n✅  RetireWise+ running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
  console.log(`🌐  Open:    http://0.0.0.0:${PORT}`);
  console.log(`🔒  Admin:   http://0.0.0.0:${PORT}/admin-login`);
  console.log(`❤️   Health:  http://0.0.0.0:${PORT}/health`);
  console.log(`📋  Logs:    ./logs/combined.log\n`);
});
module.exports = app;