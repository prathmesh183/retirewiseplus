# RetireWise+ 💼📈

RetireWise+ is a financial planning platform designed to help individuals understand long-term wealth creation through SIP investments and retirement planning.

The platform was originally developed as a **full-stack dynamic web application** using **Node.js, Express, EJS, MySQL, and JWT authentication**. It was built to support an **AMFI-registered Mutual Fund Distributor** by providing tools for financial education, lead generation, and client management.

To optimize deployment costs, the production version was later converted into a **static website**, while the original **dynamic architecture remains in this repository**.

🌐 **Live Website:** [retirewiseplus.com](https://retirewiseplus.com)

---

## Project Overview

RetireWise+ helps users and potential investors:
- Understand SIP growth
- Estimate retirement corpus
- Explore mutual fund insights
- Request financial consultations

The dynamic version also includes **admin tools to manage blogs and track consultation leads**, making it a lightweight financial CRM for mutual fund distributors.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication

### Frontend
- EJS Templating Engine
- Bootstrap
- HTML5, CSS3, JavaScript

### APIs
- [MFAPI](https://www.mfapi.in/) — Free & open-source Indian Mutual Fund API for daily NAV data (no API key required)

---

## Architecture (Dynamic Version)

```
User → Frontend (EJS + Bootstrap) → Express Server → MySQL Database → MFAPI → Response → UI
```

The backend handled authentication, financial calculations, content management, and lead tracking.

---

## Key Features

### 📊 Financial Planning Tools
- SIP Calculator
- Retirement Corpus Estimator
- Long-term Compounding Projections

### 📈 Mutual Fund Data
- Integration with [mfapi.in](https://www.mfapi.in/) for real-time daily NAV data
- No API key required — completely free

### 🔐 Admin Dashboard
Secure admin panel with JWT authentication to manage content and track leads.

**Blog Management:**
- Add / delete blog posts
- Manage financial education content

**Consultation Lead Tracking (Simple CRM):**
- Total consultation requests
- Converted / Rejected / Pending leads

---

## Database (MySQL)

MySQL was used to store:
- Admin credentials
- Blog content
- Consultation form submissions
- Lead status (converted / rejected / pending)

---

## Dynamic → Static Transition

The original app required continuous backend hosting and a managed MySQL database, costing roughly **₹500+/month**.

Since the production use case primarily needed **financial calculators and informational pages**, the backend was not essential for end users.

**What changed:**
1. EJS templates converted to static HTML pages
2. Backend-dependent features simplified
3. Database dependencies removed
4. Deployed on free static hosting

**Benefits:**
- Zero hosting cost
- Faster load speeds
- Simplified infrastructure

---

## What This Project Demonstrates

- Full-stack web development with Node.js + Express
- JWT authentication & protected admin routes
- MySQL database design
- Third-party API integration (MFAPI)
- Admin dashboard & lightweight CRM
- Real-world infrastructure optimization decision

---

## Future Improvements

- Investor portfolio tracking
- AI-based financial insights
- User accounts and dashboards
- Cloud database integration
- Automated client reporting

---

## Regulatory Info

- **AMFI Registered** — ARN-330249
- **NISM VA Certified**
- **Partner:** NJ E-Wealth Platform
- Based in **Pune, Maharashtra, India**

---

## Author

**Prathmesh Sakore**
Developer interested in finance, technology, and automation.

GitHub: [github.com/prathmesh183](https://github.com/prathmesh183)

---

> ⚠️ Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.
