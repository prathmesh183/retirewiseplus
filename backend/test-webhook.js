#!/usr/bin/env node
// ============================================================
//  RetireWise+ — n8n Webhook Diagnostic Tool
//  Tests both the welcome email and broadcast webhooks
//  with the EXACT same payload shape that app.js sends.
//
//  Usage:
//    node test-webhook.js           → test both webhooks
//    node test-webhook.js welcome   → test welcome only
//    node test-webhook.js broadcast → test broadcast only
// ============================================================
require('dotenv').config();
const axios = require('axios');

// ─────────────────────────────────────────
//  STEP 1 — Read URLs from .env
//  Make sure your .env has:
//    N8N_WEBHOOK_URL=http://localhost:5678/webhook/<id>
//    N8N_BROADCAST_WEBHOOK=http://localhost:5678/webhook/<id>
// ─────────────────────────────────────────
const WEBHOOKS = {
  welcome:   process.env.N8N_WEBHOOK_URL,
  broadcast: process.env.N8N_BROADCAST_WEBHOOK,
};

// ─────────────────────────────────────────
//  STEP 2 — Test payloads
//  These mirror EXACTLY what app.js sends so
//  you can validate your n8n nodes map correctly.
// ─────────────────────────────────────────
const PAYLOADS = {

  // Sent by: /api/newsletter/subscribe
  // n8n usage: $json.name, $json.email, $json.frequency, $json.topics
  welcome: {
    name:          'Test Subscriber',
    email:         'test@example.com',
    frequency:     'Weekly',
    topics:        'SIP, CAGR',
    subscriber_id: 999,
    timestamp:     new Date().toISOString(),
  },

  // Sent by: /api/blogs/post (after DB insert)
  // n8n usage:
  //   Blog fields  → $json.blog.title, $json.blog.category, etc.
  //   Per subscriber (after Split in Batches) → $json.email, $json.full_name, etc.
  broadcast: {
    blog: {
      id:             1,
      title:          'Why SIPs Beat Lump Sum in Volatile Markets',
      category:       'SIP',
      // Realistic HTML content (same as what DOMPurify outputs)
      content:        '<p>Systematic Investment Plans (SIPs) have consistently outperformed lump-sum investments during volatile market periods. Here\'s the mathematical truth behind rupee-cost averaging and why starting today beats waiting for the \'right\' time.</p><h2>The Data</h2><p>Investors who chose monthly SIPs over a 5-year period ending 2024 saw 14.2% CAGR vs 11.8% for lump-sum in the same Flexicap category.</p>',
      image_url:      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600',
      reference_link: 'http://localhost:5000/blogs/1',
      nj_link:        'https://www.njwealth.in/',
      published_at:   new Date().toISOString(),
    },
    // Simulates what your MySQL query returns for active subscribers
    // In production this array comes from the DB — test with 2 to
    // verify your n8n "Split in Batches" loop works correctly.
    subscribers: [
      {
        id:        1,
        full_name: 'Prathmesh Mane',
        email:     'prathmeshsakore@gmail.com',
        frequency: 'weekly',
        topics:    'SIP, CAGR, Mutual Fund',
      },
      {
        id:        2,
        full_name: 'Test Reader',
        email:     'reader@example.com',
        frequency: 'biweekly',
        topics:    'Retirement, Tax',
      },
    ],
  },
};

// ─────────────────────────────────────────
//  STEP 3 — Diagnostic logic
// ─────────────────────────────────────────
async function testWebhook(name, url, payload) {
  console.log(`\n${'─'.repeat(50)}`);
  console.log(`🔍  Testing [${name.toUpperCase()}] webhook`);
  console.log(`    URL: ${url ?? 'NOT SET'}`);

  // Guard: env var missing
  if (!url || url.includes('YOUR-NEW-WORKFLOW-ID') || url.includes('YOUR-')) {
    console.log(`\n    ❌  NOT CONFIGURED`);
    if (name === 'welcome') {
      console.log(`    Fix: Add N8N_WEBHOOK_URL=http://localhost:5678/webhook/<id> to .env`);
    } else {
      console.log(`    Fix: Add N8N_BROADCAST_WEBHOOK=http://localhost:5678/webhook/<id> to .env`);
      console.log(`    How: In n8n → New Workflow → Webhook node → copy the URL`);
    }
    return;
  }

  console.log(`\n    📦  Payload preview:`);
  if (name === 'broadcast') {
    console.log(`        blog.title:       "${payload.blog.title}"`);
    console.log(`        blog.category:    "${payload.blog.category}"`);
    console.log(`        subscribers:      ${payload.subscribers.length} test subscriber(s)`);
    console.log(`        subscribers[0]:   ${payload.subscribers[0].full_name} <${payload.subscribers[0].email}>`);
  } else {
    console.log(`        name:  ${payload.name}`);
    console.log(`        email: ${payload.email}`);
  }

  try {
    const start = Date.now();
    const res = await axios.post(url, payload, {
      timeout: 8000,
      headers: { 'Content-Type': 'application/json' },
      validateStatus: () => true, // never throw on HTTP errors
    });
    const ms = Date.now() - start;

    console.log(`\n    ⏱   Response time: ${ms}ms`);

    if (res.status === 200) {
      console.log(`    ✅  SUCCESS (200) — webhook is live and responding`);
      if (name === 'broadcast') {
        console.log(`    ✅  n8n should now email ${payload.subscribers.length} subscriber(s)`);
        console.log(`    👉  Check your inbox: ${payload.subscribers[0].email}`);
      } else {
        console.log(`    👉  Check your inbox for the welcome email`);
      }
    } else if (res.status === 404) {
      console.log(`    ❌  404 — Webhook URL not found`);
      console.log(`    Fix options:`);
      console.log(`        1. In n8n: open the workflow → click the Webhook node → copy the correct URL`);
      console.log(`        2. Make sure the workflow is set to ACTIVE (toggle in top-right)`);
      console.log(`        3. If using "Test URL" mode in n8n, click "Listen for test event" first`);
    } else if (res.status === 409) {
      console.log(`    ⚠️   409 — Workflow exists but is NOT active`);
      console.log(`    Fix: In n8n → open your workflow → toggle the Active switch ON`);
    } else if (res.status === 500) {
      console.log(`    ❌  500 — n8n workflow crashed internally`);
      console.log(`    Fix: Open n8n → Executions tab → check the error on the last run`);
      console.log(`    Response:`, JSON.stringify(res.data).slice(0, 200));
    } else {
      console.log(`    ⚠️   Unexpected status ${res.status}`);
      console.log(`    Response:`, JSON.stringify(res.data).slice(0, 200));
    }

  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      console.log(`\n    ❌  ECONNREFUSED — Cannot connect to n8n`);
      console.log(`    This means n8n is NOT running at: ${url}`);
      console.log(`\n    Fix:`);
      console.log(`        1. Open a new terminal`);
      console.log(`        2. Run: npx n8n`);
      console.log(`        3. Wait for "Editor is now accessible via: http://localhost:5678"`);
      console.log(`        4. Re-run this script`);
    } else if (err.code === 'ETIMEDOUT' || err.message.includes('timeout')) {
      console.log(`\n    ❌  TIMEOUT after 8 seconds`);
      console.log(`    n8n is reachable but the workflow is hanging.`);
      console.log(`    Fix: Check n8n Executions tab for a stuck run.`);
    } else if (err.code === 'ENOTFOUND') {
      console.log(`\n    ❌  DNS lookup failed — hostname not found`);
      console.log(`    The URL in your .env may have a typo.`);
      console.log(`    Current URL: ${url}`);
    } else {
      console.log(`\n    ❌  Unexpected error: ${err.message}`);
    }
  }
}

// ─────────────────────────────────────────
//  STEP 4 — .env sanity checks
// ─────────────────────────────────────────
function printEnvSummary() {
  console.log('\n📋  Environment Summary');
  console.log('─'.repeat(50));

  const checks = [
    ['N8N_WEBHOOK_URL',       process.env.N8N_WEBHOOK_URL],
    ['N8N_BROADCAST_WEBHOOK', process.env.N8N_BROADCAST_WEBHOOK],
    ['PORT',                  process.env.PORT],
    ['NODE_ENV',              process.env.NODE_ENV],
    ['DB_NAME',               process.env.DB_NAME],
  ];

  for (const [key, val] of checks) {
    if (!val) {
      console.log(`    ❌  ${key.padEnd(25)} NOT SET`);
    } else if (val.includes('YOUR-') || val.includes('localhost') && key.includes('N8N')) {
      console.log(`    ⚠️   ${key.padEnd(25)} ${val}  ← still using localhost (ok for dev)`);
    } else {
      console.log(`    ✅  ${key.padEnd(25)} ${val}`);
    }
  }
}

// ─────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────
(async () => {
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║   RetireWise+  —  n8n Webhook Diagnostics        ║');
  console.log('╚══════════════════════════════════════════════════╝');

  printEnvSummary();

  // Allow running a single webhook via CLI arg: node test-webhook.js broadcast
  const filter = process.argv[2]; // 'welcome' | 'broadcast' | undefined

  const toTest = filter
    ? [[filter, WEBHOOKS[filter], PAYLOADS[filter]]]
    : Object.entries(WEBHOOKS).map(([name, url]) => [name, url, PAYLOADS[name]]);

  if (filter && !WEBHOOKS[filter]) {
    console.log(`\n❌  Unknown webhook name: "${filter}"`);
    console.log(`    Valid options: welcome, broadcast`);
    process.exit(1);
  }

  for (const [name, url, payload] of toTest) {
    await testWebhook(name, url, payload);
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log('✅  Diagnostics complete.');
  console.log('    Fix any ❌ above, then publish a blog to test the full flow.\n');
})();