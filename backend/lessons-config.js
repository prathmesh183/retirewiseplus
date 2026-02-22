// All lesson content in one place
// To add a new lesson: add an entry here + add the route in app.js

const lessons = {

  // ==================== MODULE 1: BASICS ====================

  'what-is-mutual-fund': {
    title: 'What is a Mutual Fund?',
    moduleLabel: 'Module 1',
    lessonLabel: 'Lesson 1',
    headline: 'What is a <br><span style="color: var(--brand-gold)">Mutual Fund?</span>',
    subtitle: 'Understanding the building block of modern investing in India.',
    prev: null,
    next: { slug: 'what-is-sip', title: 'The Power of SIP' },
    content: `
      <p class="caps-drop">
        Imagine you and 10,000 strangers each put ₹1,000 into a common pool. Together, you have 
        ₹1 crore. You hire a trained expert to invest this money across stocks, bonds, and other 
        assets on everyone's behalf. Each person owns a proportional "slice" of the whole portfolio. 
        That's exactly what a <strong>Mutual Fund</strong> does — at scale, under strict regulation.
      </p>

      <div class="illustration-frame">
        <img src="/assets/mutualfund.png" alt="Mutual Fund Pooling Illustration">
        <p class="mt-3 small text-muted">"Pooling resources to access expert management and diversified markets."</p>
      </div>

      <h5>1. The Four Pillars of a Mutual Fund in India</h5>
      <p>
        Every mutual fund in India is structured as a four-tier system, strictly regulated by 
        <strong>SEBI (Securities and Exchange Board of India)</strong>:
      </p>
      <ul>
        <li><strong>Sponsor:</strong> The promoter/parent company that sets up the fund (e.g., SBI, HDFC, ICICI, Mirae Asset).</li>
        <li><strong>Trustee:</strong> An independent body that holds the assets in trust on behalf of investors and ensures the AMC operates lawfully.</li>
        <li><strong>AMC (Asset Management Company):</strong> The actual investment manager that employs fund managers and analysts to manage the portfolio (e.g., SBI Mutual Fund AMC).</li>
        <li><strong>RTA (Registrar & Transfer Agent):</strong> Handles record-keeping, unit allotments, and investor services (e.g., CAMS, KFintech).</li>
      </ul>

      <h5>2. The Mechanism of "Units" and NAV</h5>
      <p>
        When you invest in a mutual fund, you don't own individual stocks directly. You own 
        <strong>Units</strong> of the fund. The price of one unit is called the <strong>NAV (Net Asset Value)</strong>:
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">The NAV Formula</h4>
        <p><strong>NAV = (Total Portfolio Value − Liabilities) / Total Units Outstanding</strong></p>
        <p class="mb-0 text-muted small">Example: Portfolio = ₹500 Cr, Liabilities = ₹2 Cr, Units = 10 Cr → NAV = <strong>₹49.80/unit</strong></p>
      </div>
      <p>
        NAV is calculated and published <strong>every business day</strong> after market close (~9–10 PM). 
        A critical myth to bust: a fund with NAV ₹10 is NOT "cheaper" than one at NAV ₹500. 
        What matters is the <em>percentage growth</em> of NAV over time, not the absolute number.
      </p>

      <h5>3. Why Mutual Funds Over Direct Stocks?</h5>
      <ul>
        <li><strong>Instant Diversification:</strong> Even a ₹500 SIP gives you exposure to 50–100 companies. Buying those stocks directly would cost lakhs.</li>
        <li><strong>Professional Management:</strong> Experienced fund managers and large research teams do the analysis for you.</li>
        <li><strong>Regulation & Safety:</strong> SEBI mandates daily NAV disclosure, monthly portfolio disclosure, strict investment limits, and segregation of investor assets — your money can never be used for the AMC's own operations.</li>
        <li><strong>Accessibility:</strong> Start with as little as ₹100/month via SIP. No demat account needed for most funds.</li>
      </ul>

      <h5>4. The Three Major Categories</h5>
      <div class="row mt-3">
        <div class="col-md-4 mb-3">
          <p><strong>🟦 Equity Funds</strong><br>
          <small class="text-muted">Invest in company shares. Best for 5+ year goals. Historically delivered 12–15% CAGR on Nifty 50 over long periods. High short-term volatility, high long-term growth.</small></p>
        </div>
        <div class="col-md-4 mb-3">
          <p><strong>🟨 Debt Funds</strong><br>
          <small class="text-muted">Invest in government bonds, corporate bonds, T-bills. Lower risk, stable 6–8% returns. Good for 1–3 year goals. Taxed at slab rate post April 2023.</small></p>
        </div>
        <div class="col-md-4 mb-3">
          <p><strong>🟧 Hybrid Funds</strong><br>
          <small class="text-muted">A mix of equity and debt. Balanced Advantage Funds dynamically shift the ratio based on market valuations — ideal for moderate risk investors with 3–5 year horizon.</small></p>
        </div>
      </div>

      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">The Core Formula to Remember</h4>
        <p><strong>Mutual Fund = Pooled Money + Expert Management + Diversification + SEBI Regulation</strong></p>
        <p class="mb-0 text-muted small">This combination gives retail investors access to tools that were previously only available to the ultra-wealthy.</p>
      </div>

      <h5>5. Direct Plan vs Regular Plan — Always Pick Direct</h5>
      <p>
        Every mutual fund in India is available in two versions. <strong>Direct Plans</strong> are bought 
        directly from the AMC (no middleman). <strong>Regular Plans</strong> are bought through a 
        distributor/broker. The only difference: Regular Plans have a higher expense ratio because 
        a portion is paid as commission to the distributor.
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">The Cost of Regular Plan Over 20 Years</h4>
        <p>Same fund, same gross return of 12%, but different expense ratios:</p>
        <p>Direct Plan (0.5% ER): Net 11.5% → ₹10L becomes <strong>₹1.54 Crore</strong></p>
        <p>Regular Plan (1.5% ER): Net 10.5% → ₹10L becomes <strong>₹1.23 Crore</strong></p>
        <p class="mb-0"><strong>You lose ₹31 Lakhs</strong> over 20 years just by choosing Regular over Direct.</p>
      </div>
    `
  },

  'what-is-sip': {
    title: 'The Power of SIP',
    moduleLabel: 'Module 1',
    lessonLabel: 'Lesson 2',
    headline: 'The Power of <br><span style="color: var(--brand-gold)">SIP</span>',
    subtitle: 'How investing ₹500/month can build a crore — and the math that proves it.',
    prev: { slug: 'what-is-mutual-fund', title: 'What is a Mutual Fund?' },
    next: { slug: 'nav-explained', title: 'NAV Explained Simply' },
    content: `
      <p class="caps-drop">
        A Systematic Investment Plan (SIP) is the single most powerful tool available to a retail 
        investor in India. It removes emotion from investing, forces discipline, and harnesses the 
        two most powerful forces in finance: <strong>compounding</strong> and 
        <strong>Rupee Cost Averaging</strong>. You don't need to be rich to start — you need to start.
      </p>

      <div class="illustration-frame">
        <img src="/assets/sip.png" alt="Systematic Investment Plan Visual" loading="lazy">
        <p class="mt-3 small text-muted">"Consistent drops fill the ocean — consistent SIPs build crores."</p>
      </div>

      <h5>1. The SIP Wealth Formula</h5>
      <p>The future value of a SIP can be calculated precisely:</p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">SIP Future Value Formula</h4>
        <p><strong>FV = P × [ (1 + r)ⁿ − 1 ] / r × (1 + r)</strong></p>
        <p class="text-muted small">Where: P = Monthly amount | r = Monthly rate (Annual % ÷ 12) | n = Total months</p>
        <hr style="border-color: #ccc;">
        <p><strong>Example:</strong> ₹10,000/month for 20 years at 12% annual return:</p>
        <p>r = 0.01 | n = 240</p>
        <p>FV = 10,000 × [(1.01)²⁴⁰ − 1] / 0.01 × 1.01</p>
        <p>Total Invested: <strong>₹24,00,000</strong> → Wealth Created: <strong>₹98,92,556</strong></p>
        <p class="mb-0">Your money multiplied <strong>4.1×</strong> — and compounding did most of the work in the last 5 years.</p>
      </div>

      <h5>2. Rupee Cost Averaging — Your Market Crash Advantage</h5>
      <p>
        When you invest the same amount every month, you automatically buy <strong>more units when 
        prices are low</strong> and fewer when prices are high. Over time, your average cost per unit 
        ends up <em>lower</em> than the average market price.
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">RCA in Action</h4>
        <p>₹5,000 invested each month for 4 months:</p>
        <table style="width:100%; font-size:0.9rem; border-collapse:collapse;">
          <tr style="border-bottom:1px solid #ccc;"><th style="text-align:left; padding:4px;">Month</th><th>NAV (₹)</th><th>Units Bought</th></tr>
          <tr><td style="padding:4px;">January</td><td>100</td><td>50.00</td></tr>
          <tr><td style="padding:4px;">February</td><td>80</td><td>62.50</td></tr>
          <tr><td style="padding:4px;">March</td><td>90</td><td>55.56</td></tr>
          <tr><td style="padding:4px;">April</td><td>110</td><td>45.45</td></tr>
        </table>
        <p class="mt-3">Total Invested: ₹20,000 | Total Units: 213.51</p>
        <p><strong>Your Average Cost: ₹93.67/unit</strong> vs Average Market Price: ₹95/unit</p>
        <p class="mb-0">The crash in February actually <strong>helped you</strong> — you bought more units cheaply.</p>
      </div>

      <h5>3. Step-Up SIP — Match Investing to Your Growing Income</h5>
      <p>
        A Step-Up (or Top-Up) SIP automatically increases your investment by a fixed % every year. 
        This is the most impactful upgrade you can make to your SIP strategy.
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Step-Up SIP vs Regular SIP (20 Years, 12% return)</h4>
        <p>Regular SIP: ₹10,000/month fixed → <strong>₹99 Lakhs</strong></p>
        <p>Step-Up SIP: ₹10,000 + 10% increase each year → <strong>₹1.89 Crore</strong></p>
        <p class="mb-0">A 10% annual step-up nearly <strong>doubles your final corpus</strong>.</p>
      </div>

      <h5>4. The Start-Early Advantage</h5>
      <p>
        Priya starts a ₹5,000/month SIP at age 22. Rahul starts ₹20,000/month at age 35. 
        Both retire at 60, both earn 12% per year. Result:
      </p>
      <ul>
        <li>Priya (22–60, 38 years): <strong>₹5.32 Crore</strong> — invested only ₹22.8 lakhs total</li>
        <li>Rahul (35–60, 25 years): <strong>₹3.75 Crore</strong> — invested ₹60 lakhs total</li>
      </ul>
      <p>
        Priya invested <strong>less than half the money</strong> but ended up with more — purely because of 
        starting 13 years earlier. Time is the most powerful variable in the compounding equation.
      </p>

      <h5>5. The Golden Rule: Never Stop During a Crash</h5>
      <p>
        Stopping SIP during a market crash is the single biggest mistake investors make. 
        Crashes are precisely when RCA works hardest for you — you buy the maximum units at the 
        lowest prices. Every investor who continued SIP through the 2008 financial crisis and the 
        2020 COVID crash ended up with exceptional wealth by 2023.
      </p>
    `
  },

  'nav-explained': {
    title: 'NAV Explained Simply',
    moduleLabel: 'Module 1',
    lessonLabel: 'Lesson 3',
    headline: 'The Price Tag: <br><span style="color: var(--brand-gold)">Understanding NAV</span>',
    subtitle: 'Demystifying Net Asset Value — the heartbeat of your mutual fund units.',
    prev: { slug: 'what-is-sip', title: 'The Power of SIP' },
    next: { slug: 'sip-deep-dive', title: 'SIP Deep Dive' },
    content: `
      <p class="caps-drop">
        If you walk into a grocery store, every product has a price tag. In the world of mutual funds, 
        <strong>Net Asset Value (NAV)</strong> is that price tag — it represents the market value of 
        a single unit of a mutual fund scheme on a given day. Understanding NAV deeply will help you 
        make better investing decisions and avoid some of the most common investor mistakes.
      </p>

      <div class="illustration-frame">
        <img src="/public/assets/nav-concept.png" alt="NAV Calculation Illustration" loading="lazy">
        <p class="mt-3 small text-muted">"NAV is simply the total value of what a fund holds, divided by the number of unit-holders."</p>
      </div>

      <h5>1. The NAV Formula — Broken Down</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">NAV = (Total Assets − Liabilities) / Total Units</h4>
        <p><strong>Where:</strong></p>
        <p>Total Assets = Market value of all stocks + bonds + cash held by the fund</p>
        <p>Liabilities = Accrued expenses, management fees, outstanding payables</p>
        <p class="mb-0 text-muted small">Example: Assets = ₹500 Cr | Liabilities = ₹2 Cr | Units = 10 Cr → <strong>NAV = ₹49.80</strong></p>
      </div>
      <p>
        NAV is calculated by fund houses every business day after market close and published by 
        <strong>9–10 PM IST</strong>. SEBI mandates this daily transparency — so you always know exactly 
        what each unit of your fund is worth.
      </p>

      <h5>2. The Expense Ratio and Its Daily Impact on NAV</h5>
      <p>
        The expense ratio (annual management fee) is not charged as a lump sum — it's deducted 
        proportionally every single day from the fund's assets before NAV is calculated:
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Daily Expense Deduction</h4>
        <p><strong>Daily Impact = NAV × (Expense Ratio / 365)</strong></p>
        <p class="mb-0 text-muted small">On a ₹100 NAV fund with 1.5% expense ratio: ₹0.0041/unit is deducted each day. You never "feel" it — but over 20 years, a 1% higher expense ratio costs you ₹31+ lakhs on ₹10L invested.</p>
      </div>

      <h5>3. The Biggest NAV Myth — Busted Forever</h5>
      <p>
        Many first-time investors believe that a fund with NAV ₹10 is "cheaper" or "has more room 
        to grow" than a fund with NAV ₹500. <strong>This is completely wrong.</strong>
      </p>
      <p>
        If you invest ₹10,000 in Fund A (NAV ₹10) you get 1,000 units. 
        If you invest ₹10,000 in Fund B (NAV ₹500) you get 20 units. 
        If both funds grow their underlying portfolio by 10%:
      </p>
      <ul>
        <li>Fund A: NAV becomes ₹11 → 1,000 units × ₹11 = <strong>₹11,000</strong></li>
        <li>Fund B: NAV becomes ₹550 → 20 units × ₹550 = <strong>₹11,000</strong></li>
      </ul>
      <p>
        <strong>Identical outcome.</strong> The NAV number is irrelevant. What matters is how fast 
        the underlying portfolio grows. Fund B's high NAV just means it has been growing for longer — 
        which is actually a <em>positive signal</em> about its track record.
      </p>

      <h5>4. Cut-off Timings — What NAV Do You Actually Get?</h5>
      <p>The NAV you receive depends on <strong>when your payment reaches the fund</strong>:</p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">SEBI-Mandated Cut-off Times</h4>
        <p>Liquid/Overnight Funds: Before 1:30 PM → Previous day's NAV</p>
        <p>Debt Funds: Before 3:00 PM → Same day's NAV</p>
        <p class="mb-0">Equity/Hybrid Funds: Before 3:00 PM → Same day's NAV (after market close)</p>
      </div>

      <h5>5. Historical NAV — Your Performance Indicator</h5>
      <p>
        While current NAV is just a price tag, the <em>history</em> of NAV growth tells you everything 
        about a fund's performance. A fund whose NAV grew from ₹10 to ₹500 over 15 years has 
        delivered approximately:
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">CAGR from NAV History</h4>
        <p><strong>CAGR = (Ending NAV / Beginning NAV)^(1/Years) − 1</strong></p>
        <p class="mb-0 text-muted small">Example: NAV grew from ₹10 to ₹500 in 15 years → CAGR = (500/10)^(1/15) − 1 = 28.5% per year</p>
      </div>
    `
  },

  // ==================== MODULE 2: INVESTING METHODS ====================

  'sip-deep-dive': {
    title: 'SIP – Deep Dive',
    moduleLabel: 'Module 2',
    lessonLabel: 'Lesson 1',
    headline: 'SIP — <br><span style="color: var(--brand-gold)">Deep Dive</span>',
    subtitle: 'Advanced SIP strategies, the right fund types, and costly mistakes to avoid.',
    prev: { slug: 'nav-explained', title: 'NAV Explained Simply' },
    next: { slug: 'lumpsum', title: 'Lumpsum Strategy' },
    content: `
      <p class="caps-drop">
        You know what a SIP is and why it works. Now let's go deeper — into Step-Up SIPs, 
        Rupee Cost Averaging math, the best fund types for SIP, and the costly mistakes 
        that prevent most investors from achieving their goals. This is where knowledge 
        becomes real wealth.
      </p>

      <div class="illustration-frame">
        <img src="/public/assets/sip-averaging.png" alt="Rupee Cost Averaging Illustration" loading="lazy">
        <p class="mt-3 small text-muted">"The dip in NAV is not a threat — it's the SIP investor's greatest opportunity."</p>
      </div>

      <h5>1. The Full SIP Wealth Formula</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">SIP Future Value</h4>
        <p><strong>FV = P × [ (1 + r)ⁿ − 1 ] / r × (1 + r)</strong></p>
        <p class="text-muted small">P = Monthly SIP | r = Monthly return (Annual rate ÷ 12) | n = Total months</p>
        <hr style="border-color:#ccc">
        <p>₹5,000/month | 12% return | 20 years: → <strong>₹49.96 Lakhs</strong> (invested only ₹12L)</p>
        <p class="mb-0">₹10,000/month | 12% return | 25 years: → <strong>₹1.89 Crore</strong> (invested only ₹30L)</p>
      </div>

      <h5>2. Step-Up SIP — The Compounding Multiplier</h5>
      <p>
        A Step-Up SIP increases your monthly investment by a fixed percentage every year (typically 
        10–15%, aligned with your annual salary increment). The effect on final corpus is dramatic:
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Step-Up vs Regular SIP (20 years, 12% return)</h4>
        <p>Regular: ₹10,000/month (flat) → <strong>₹99 Lakhs</strong></p>
        <p>Step-Up 10%/yr: ₹10,000 → ₹11,000 → ₹12,100... → <strong>₹1.89 Crore</strong></p>
        <p class="mb-0 text-muted small">The step-up investor invested more rupees — but it aligned with income growth, making it painless, while nearly doubling the final outcome.</p>
      </div>

      <h5>3. Best Fund Types for SIP</h5>
      <ul>
        <li>
          <strong>Flexi-Cap Funds (7+ year horizon):</strong> The fund manager can allocate freely across 
          large, mid, and small cap stocks. Best risk-reward balance for most investors. 
          Historical 10-yr CAGR: 14–18%.
        </li>
        <li>
          <strong>Index Funds — Nifty 50 / Nifty Next 50 (5+ year horizon):</strong> Low cost (0.10–0.15% ER), 
          no manager risk, tracks market returns. The SPIVA India report shows ~70% of active 
          large-cap funds underperform their benchmark over 10 years. Index funds guarantee you 
          never underperform the index.
        </li>
        <li>
          <strong>Mid-Cap Funds (7+ year horizon):</strong> Higher volatility, but India's mid-cap space 
          has historically delivered 16–20% CAGR over long periods. Only for investors who can 
          stomach 40–50% short-term drawdowns.
        </li>
        <li>
          <strong>ELSS Funds (3-year lock-in):</strong> Equity fund + Section 80C tax benefit. 
          Saves up to ₹45,000/year in taxes (30% bracket) on ₹1.5 lakh investment. 
          Best 80C option for investors willing to take market risk.
        </li>
      </ul>

      <h5>4. SIP Flexibility Features You Should Know</h5>
      <ul>
        <li><strong>SIP Pause:</strong> Most AMCs allow pausing for 1–3 months during financial emergencies — your existing investment keeps compounding.</li>
        <li><strong>SIP Stop:</strong> Stop anytime, no penalty. Invested units stay and grow.</li>
        <li><strong>SIP Modify:</strong> Increase or decrease amount anytime via the AMC app or platform.</li>
        <li><strong>SIP Top-Up:</strong> Set an automatic annual increment at the time of creating the SIP — no manual action needed every year.</li>
      </ul>

      <h5>5. Common SIP Mistakes That Cost Crores</h5>
      <ul>
        <li>
          <strong>Stopping during market crashes:</strong> This is when you buy the most units cheaply. 
          Investors who stopped SIP in March 2020 (COVID crash) and restarted later missed buying 
          units at the lowest prices in years.
        </li>
        <li>
          <strong>Chasing last year's top performer:</strong> A fund ranked #1 this year has only a 25% 
          probability of being top-quartile next year (CRISIL persistence studies). 
          Past 1-year return is a terrible predictor.
        </li>
        <li>
          <strong>Over-diversification:</strong> Owning 8–10 funds doesn't mean more diversification. 
          Beyond 5 funds, returns converge to market average (you've built a closet index fund 
          but paying active management fees).
        </li>
        <li>
          <strong>Not reviewing annually:</strong> Check portfolio once a year — not to chase returns, 
          but to rebalance if asset allocation has drifted and remove consistently underperforming funds.
        </li>
      </ul>
    `
  },

  'lumpsum': {
    title: 'Lumpsum Strategy',
    moduleLabel: 'Module 2',
    lessonLabel: 'Lesson 2',
    headline: 'Lumpsum <br><span style="color: var(--brand-gold)">Investing Strategy</span>',
    subtitle: 'When and how to deploy a large amount wisely — using valuations and STP.',
    prev: { slug: 'sip-deep-dive', title: 'SIP Deep Dive' },
    next: { slug: 'swp', title: 'Retiring with SWP' },
    content: `
      <p class="caps-drop">
        You've received a bonus, sold a property, or have a large amount sitting idle in your savings 
        account losing to inflation. A lumpsum investment — deploying a large amount all at once — 
        can be the most powerful way to grow wealth. But the timing and strategy matter enormously. 
        Invest blindly at a market peak and you could wait years just to break even.
      </p>

      <div class="illustration-frame">
        <img src="/public/assets/lumpsum.png" alt="Lumpsum Investing Concept" loading="lazy">
        <p class="mt-3 small text-muted">"A single capital commitment, compounding fully from day one."</p>
      </div>

      <h5>1. The Lumpsum Growth Formula</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Lumpsum Future Value</h4>
        <p><strong>FV = PV × (1 + r)ⁿ</strong></p>
        <p class="text-muted small">PV = Amount invested | r = Annual return | n = Years</p>
        <hr style="border-color:#ccc">
        <p>₹5,00,000 at 13% for 15 years → <strong>₹31.27 Lakhs</strong> (6.25× growth)</p>
        <p>₹10,00,000 at 12% for 20 years → <strong>₹96.46 Lakhs</strong> (9.6× growth)</p>
        <p class="mb-0">₹25,00,000 at 12% for 25 years → <strong>₹4.25 Crore</strong> — compounding is breathtaking at 25 years.</p>
      </div>

      <h5>2. Lumpsum vs SIP — When Does Each Win?</h5>
      <p>
        Mathematically, lumpsum beats SIP in <strong>steadily rising markets</strong> because the entire 
        capital is compounding from day one. SIP wins in <strong>volatile or falling-then-rising markets</strong> 
        because Rupee Cost Averaging lowers your average purchase cost.
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Historical Evidence (Nifty 50, 2000–2023)</h4>
        <p>In bull markets: Lumpsum outperformed in <strong>68% of 5-year periods</strong></p>
        <p>In volatile markets: SIP outperformed in <strong>71% of 5-year periods</strong></p>
        <p class="mb-0">Since you can't predict which market you're entering → <strong>Use Valuation to decide</strong></p>
      </div>

      <h5>3. How to Check Market Valuation Before Lumpsum</h5>
      <p>
        The <strong>Nifty P/E Ratio</strong> (published daily by NSE) is your best guide. 
        It tells you how expensive the market is relative to earnings:
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">P/E Ratio = Market Price ÷ Earnings Per Share</h4>
        <table style="width:100%; font-size:0.9rem; border-collapse:collapse; margin-top:10px;">
          <tr style="border-bottom:1px solid #ccc; background:#f4f7f6;"><th style="padding:6px; text-align:left;">Nifty P/E Zone</th><th style="padding:6px;">Market State</th><th style="padding:6px;">Action</th></tr>
          <tr style="border-bottom:1px solid #eee;"><td style="padding:6px;">Below 15</td><td style="padding:6px;">Deeply Undervalued</td><td style="padding:6px;">✅ Aggressive lumpsum</td></tr>
          <tr style="border-bottom:1px solid #eee;"><td style="padding:6px;">15 – 20</td><td style="padding:6px;">Fairly Valued</td><td style="padding:6px;">✅ Lumpsum is fine</td></tr>
          <tr style="border-bottom:1px solid #eee;"><td style="padding:6px;">20 – 25</td><td style="padding:6px;">Slightly Expensive</td><td style="padding:6px;">⚠️ Partial lumpsum / SIP</td></tr>
          <tr><td style="padding:6px;">Above 25</td><td style="padding:6px;">Overvalued</td><td style="padding:6px;">❌ Avoid lumpsum — use STP</td></tr>
        </table>
      </div>

      <h5>4. STP — The Smartest Way to Deploy a Large Amount</h5>
      <p>
        If markets look expensive, don't let your money sit in a savings account (3.5%). 
        Use a <strong>Systematic Transfer Plan (STP)</strong>:
      </p>
      <ul>
        <li>Step 1: Park the entire lumpsum in a <strong>Liquid Fund</strong> (earns ~6.5–7.5%)</li>
        <li>Step 2: Set up an automatic monthly transfer of a fixed amount to an <strong>Equity Fund</strong></li>
        <li>Step 3: You earn liquid fund returns while waiting <em>and</em> get RCA averaging on equity</li>
      </ul>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">STP Benefit</h4>
        <p>₹12,00,000 lumpsum, deployed via STP over 12 months:</p>
        <p>Savings Account (3.5%) while waiting: Earns ₹23,100 interest</p>
        <p class="mb-0">Liquid Fund (7%) while waiting: Earns <strong>₹46,200</strong> — more than double, while averaging into equity</p>
      </div>

      <h5>5. Lumpsum Tax Rules (Post Budget 2024)</h5>
      <ul>
        <li><strong>Equity funds held less than 12 months:</strong> 20% Short Term Capital Gains (STCG)</li>
        <li><strong>Equity funds held 12+ months:</strong> 12.5% Long Term Capital Gains (LTCG) — first ₹1.25 lakh LTCG per year is tax-free</li>
        <li><strong>Debt funds (any duration):</strong> Added to income and taxed at your slab rate (post April 2023 — indexation removed)</li>
      </ul>
    `
  },

  'swp': {
    title: 'Retiring with SWP',
    moduleLabel: 'Module 2',
    lessonLabel: 'Lesson 3',
    headline: 'Retiring with <br><span style="color: var(--brand-gold)">SWP</span>',
    subtitle: 'Create a growing monthly income from your corpus — and pay far less tax than FD.',
    prev: { slug: 'lumpsum', title: 'Lumpsum Strategy' },
    next: { slug: 'risk-volatility', title: 'Market Risk vs Volatility' },
    content: `
      <p class="caps-drop">
        What if your investments paid you a growing salary every month — even after you stopped 
        working — while the original corpus kept increasing? A Systematic Withdrawal Plan (SWP) 
        makes this possible. It is the most tax-efficient retirement income strategy available 
        to Indian investors, and it beats Fixed Deposits comprehensively on both returns and 
        post-tax income.
      </p>

      <div class="illustration-frame">
        <img src="/public/assets/swp-harvest.png" alt="SWP Systematic Harvesting Illustration" loading="lazy">
        <p class="mt-3 small text-muted">"Harvesting the fruit (monthly income) while keeping the tree (your corpus) growing."</p>
      </div>

      <h5>1. How SWP Works — The Mechanics</h5>
      <p>
        You invest a corpus into a mutual fund. You instruct the fund house to automatically 
        redeem a fixed number of units (or a fixed rupee amount) every month and credit it to 
        your bank account. The remaining units continue to grow.
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">SWP Unit Redemption Formula</h4>
        <p><strong>Units Redeemed = Monthly Withdrawal Amount ÷ Current NAV</strong></p>
        <p><strong>Remaining Units = Previous Units − Units Redeemed</strong></p>
        <p class="mb-0"><strong>Portfolio Value = Remaining Units × New NAV</strong></p>
      </div>

      <h5>2. The 4% Safe Withdrawal Rule for India</h5>
      <p>
        The classic "4% rule" states that you can withdraw 4% of your corpus annually without 
        depleting it over 30 years, assuming consistent returns. For India, with higher inflation 
        (~6%), a 5–6% withdrawal rate is often sustainable if the portfolio earns 10–12%.
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Safe Monthly Withdrawal = (Corpus × 4–5%) ÷ 12</h4>
        <p>Corpus: ₹50 Lakhs | 4% withdrawal → <strong>₹16,667/month</strong></p>
        <p>Corpus: ₹1 Crore | 4% withdrawal → <strong>₹33,333/month</strong></p>
        <p class="mb-0">Corpus: ₹2 Crore | 5% withdrawal → <strong>₹83,333/month</strong> — while corpus continues growing</p>
      </div>

      <h5>3. SWP vs Fixed Deposit — The Tax Advantage</h5>
      <p>
        This is where SWP truly shines. With an FD, <strong>100% of the interest</strong> is added 
        to your income and taxed at your slab rate (up to 30%). With SWP from an equity fund held 
        over 1 year, <strong>only the capital gains portion</strong> of each withdrawal is taxed — 
        and at just 12.5%.
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Monthly Tax Comparison — ₹50,000 Withdrawal</h4>
        <p>FD Interest: ₹50,000 fully taxable → 30% slab → <strong>₹15,000 tax</strong></p>
        <p>SWP (cost basis ₹100, NAV ₹115): Gain portion = ₹6,522</p>
        <p>SWP Tax: ₹6,522 × 12.5% = <strong>₹815 tax</strong></p>
        <p class="mb-0">Monthly tax saving: <strong>₹14,185</strong> — over 20 years of retirement, this is crores saved.</p>
      </div>

      <h5>4. Building Your SWP Retirement System</h5>
      <ul>
        <li><strong>Phase 1 (Working years):</strong> Build corpus aggressively via SIP in equity funds.</li>
        <li><strong>Phase 2 (5 years before retirement):</strong> Gradually shift 30–40% to hybrid/balanced funds to reduce risk.</li>
        <li><strong>Phase 3 (At retirement):</strong> Set up SWP for your monthly expense amount. Keep 6–12 months of expenses in a liquid fund as a buffer so you never have to redeem equity during a crash.</li>
        <li><strong>Phase 4 (Ongoing):</strong> Review annually, adjust withdrawal amount for inflation (increase SWP by ~6% each year).</li>
      </ul>
    `
  },

  // ==================== MODULE 3: RISK & REALITY ====================

  'risk-volatility': {
    title: 'Market Risk vs Volatility',
    moduleLabel: 'Module 3',
    lessonLabel: 'Lesson 1',
    headline: 'Market Risk <br><span style="color: var(--brand-gold)">vs Volatility</span>',
    subtitle: 'Why temporary drops are not the same as permanent loss — and how to stay rational.',
    prev: { slug: 'swp', title: 'Retiring with SWP' },
    next: { slug: 'inflation', title: 'The Silent Wealth Killer' },
    content: `
      <p class="caps-drop">
        The biggest reason people avoid mutual funds is fear of market crashes. "What if I lose my 
        money?" But there is a critical, life-changing distinction between <strong>volatility</strong> 
        and <strong>risk</strong> that every investor must internalize. Confusing the two leads to 
        the most expensive mistakes in investing — panic-selling at the bottom and sitting in 
        cash while wealth is being created.
      </p>

      <h5>1. Volatility ≠ Risk — The Key Distinction</h5>
      <p>
        <strong>Volatility</strong> is the normal short-term fluctuation of your investment's value — 
        up and down, often dramatically. For a long-term investor holding quality diversified funds, 
        volatility is merely noise. <strong>Risk</strong>, in the true investment sense, is the 
        permanent, unrecoverable loss of capital.
      </p>
      <p>
        A quality equity mutual fund investing in Nifty 50 companies has extremely high volatility 
        (can fall 50% in a crash) but very low actual risk over 10+ years, because the underlying 
        businesses keep growing. An unregulated chit fund or a single mid-cap stock can have the same 
        short-term volatility but carry genuinely high risk of permanent loss.
      </p>

      <h5>2. The Nifty 50 Historical Record</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Every Major Crash — And What Happened Next</h4>
        <p>2008 Global Financial Crisis: Nifty fell <strong>−60%</strong> → Recovered fully by 2010</p>
        <p>2011 European Debt Crisis: Nifty fell <strong>−28%</strong> → New highs by 2013</p>
        <p>2020 COVID Crash: Nifty fell <strong>−38%</strong> in 40 days → New all-time high by Nov 2020</p>
        <p class="mb-0"><strong>Every single time, without exception, the Nifty 50 recovered and reached new highs.</strong></p>
      </div>
      <p>
        This is not a coincidence — it is structural. The Nifty 50 continuously replaces 
        weak companies with strong ones. You're always invested in India's top 50 performing businesses.
      </p>

      <h5>3. Measuring Volatility — Standard Deviation and Beta</h5>
      <p>
        When evaluating a fund's risk, two key metrics help you quantify volatility:
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Standard Deviation & Beta</h4>
        <p><strong>Standard Deviation (σ):</strong> Measures total return volatility. Higher σ = more volatile.</p>
        <p>A fund with σ of 18% fluctuates more than one with σ of 12%.</p>
        <p><strong>Beta (β):</strong> Measures sensitivity to market movements.</p>
        <p>β = 1.2 → If Nifty falls 10%, fund falls ~12%. If Nifty rises 10%, fund rises ~12%.</p>
        <p class="mb-0">β = 0.7 → Fund dampens market swings — less volatile than the index.</p>
      </div>

      <h5>4. How to Handle Volatility Rationally</h5>
      <ul>
        <li><strong>Don't check your portfolio daily</strong> — short-term noise creates emotional decisions. Monthly is sufficient.</li>
        <li><strong>Keep investing through crashes</strong> — your SIP buys more units at lower prices. The crash is working for you.</li>
        <li><strong>Maintain an emergency fund</strong> (6 months of expenses in liquid fund) — so you're never forced to sell equity during a crash.</li>
        <li><strong>Match fund type to time horizon</strong> — equity only for 5+ year goals. Short-term money in debt/liquid funds.</li>
        <li><strong>Zoom out</strong> — look at your 5-year or 10-year chart when markets fall. The long-term trend is unmistakably upward.</li>
      </ul>

      <h5>5. Real Risks to Actually Watch Out For</h5>
      <ul>
        <li><strong>Investing emergency money in equity</strong> — being forced to sell during a crash = permanent loss</li>
        <li><strong>Concentration risk</strong> — putting all money in one sector fund (e.g., only IT or only PSU)</li>
        <li><strong>Credit risk in debt funds</strong> — some debt funds hold low-rated bonds that can default (Franklin crisis, 2020)</li>
        <li><strong>Unregulated investments</strong> — anything not registered with SEBI (including many "high return" schemes)</li>
        <li><strong>Leverage/Borrowing to invest</strong> — taking a loan to invest in equity amplifies both gains and losses dangerously</li>
      </ul>
    `
  },

  'inflation': {
    title: 'The Silent Wealth Killer',
    moduleLabel: 'Module 3',
    lessonLabel: 'Lesson 2',
    headline: 'Inflation: <br><span style="color: var(--brand-gold)">The Silent Wealth Killer</span>',
    subtitle: 'Why keeping money in a savings account is actually losing money — and what to do about it.',
    prev: { slug: 'risk-volatility', title: 'Market Risk vs Volatility' },
    next: { slug: 'fd-vs-mutual-fund', title: 'FD vs Mutual Funds' },
    content: `
      <p class="caps-drop">
        ₹1 lakh in your savings account today will not buy the same things five years from now. 
        Inflation — the steady, invisible rise in prices — silently erodes your purchasing power 
        every single year. Most people don't feel it until it's too late. The savings account feels 
        safe. The number in your bank grows. But in real terms, your wealth is shrinking.
      </p>

      <div class="illustration-frame">
        <img src="/public/assets/inflation-effect.png" alt="Inflation Erosion Illustration" loading="lazy">
        <p class="mt-3 small text-muted">"The same ₹100 note buys less and less with every passing year."</p>
      </div>

      <h5>1. The Real Return Formula — The Only Number That Matters</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Real Return = [(1 + Nominal Return) ÷ (1 + Inflation)] − 1</h4>
        <p>Savings Account: 3.5% return − 6% inflation → Real Return = <strong>−2.36%</strong></p>
        <p>Fixed Deposit: 7% return − 6% inflation → Real Return = <strong>+0.94%</strong></p>
        <p class="mb-0">Equity Fund: 12% return − 6% inflation → Real Return = <strong>+5.66%</strong></p>
      </div>
      <p>
        Your savings account is not preserving wealth — it is destroying purchasing power at 
        <strong>2.36% per year</strong>. That feels painless until you do the 10-year math.
      </p>

      <h5>2. What Inflation Actually Does to Your Wealth</h5>
      <ul>
        <li>₹10 lakhs today → worth only <strong>₹5.58 lakhs</strong> in 10 years in real purchasing power (at 6% inflation)</li>
        <li>Monthly household expenses of ₹50,000 today → will need <strong>₹89,542/month</strong> in 10 years</li>
        <li>Your child's engineering degree costing ₹10 lakhs today → will cost <strong>₹17.9 lakhs</strong> in 10 years</li>
        <li>A flat worth ₹60 lakhs today → likely to cost <strong>₹1.07 Crore</strong> in 10 years</li>
      </ul>

      <h5>3. The Rule of 70 — How Fast Inflation Halves Your Money</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Years to Halve Purchasing Power = 70 ÷ Inflation Rate</h4>
        <p>At 6% inflation: Money halves in purchasing power every <strong>11.7 years</strong></p>
        <p>At 7% inflation: Money halves in <strong>10 years</strong></p>
        <p class="mb-0">At 3% inflation (US/Europe): Money halves in <strong>23 years</strong> — India's inflation is much harsher</p>
      </div>

      <h5>4. India's Inflation Reality — Sector by Sector</h5>
      <p>
        India's headline CPI (~5–6%) understates the inflation experienced by most middle-class 
        families because education, healthcare, and real estate inflate much faster:
      </p>
      <ul>
        <li><strong>Education inflation:</strong> ~10–12% per year (private schools, colleges)</li>
        <li><strong>Healthcare inflation:</strong> ~12–15% per year (hospital procedures, medicines)</li>
        <li><strong>Food inflation:</strong> ~6–8% per year</li>
        <li><strong>Real estate inflation:</strong> ~7–10% per year in metro cities</li>
      </ul>
      <p>
        If your child's education or your healthcare are major future expenses, you need returns 
        significantly above 12%, not just above 6%.
      </p>

      <h5>5. How Equity Mutual Funds Beat Inflation — The Long-Term Data</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Nifty 50 Returns vs Inflation (20-year data)</h4>
        <p>Nifty 50 CAGR (2004–2024): ~<strong>13.5% per year</strong></p>
        <p>Average CPI Inflation (2004–2024): ~<strong>6.2% per year</strong></p>
        <p class="mb-0">Real Return from Equity: ~<strong>6.9% per year</strong> — your purchasing power doubled every ~10 years</p>
      </div>
    `
  },

  'fd-vs-mutual-fund': {
    title: 'FD vs Mutual Funds',
    moduleLabel: 'Module 3',
    lessonLabel: 'Lesson 3',
    headline: 'FD vs <br><span style="color: var(--brand-gold)">Mutual Funds</span>',
    subtitle: 'The complete, honest comparison every Indian investor needs to read.',
    prev: { slug: 'inflation', title: 'The Silent Wealth Killer' },
    next: { slug: 'compounding', title: 'Compounding Math' },
    content: `
      <p class="caps-drop">
        Fixed Deposits feel safe. The number grows predictably. Your bank is trusted. The interest 
        is guaranteed. So why do financial advisors consistently recommend mutual funds for long-term 
        goals? Because over any period beyond 3 years, the after-tax, after-inflation returns tell 
        a starkly different story. Let's do a rigorous, honest comparison.
      </p>

      <div class="illustration-frame">
        <img src="/public/assets/unnamed.jpg" alt="FD vs Mutual Fund Comparison" loading="lazy">
        <p class="mt-3 small text-muted">"The certainty of a loan versus the ownership of a growing business."</p>
      </div>

      <h5>1. The 10-Year Wealth Comparison</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">₹10 Lakhs Invested for 10 Years</h4>
        <p>FD at 7% (pre-tax): ₹19.67 Lakhs → After 30% tax on interest: <strong>~₹15.2 Lakhs</strong></p>
        <p>Equity Fund at 12% CAGR: ₹31.06 Lakhs → LTCG tax (12.5% above ₹1.25L): <strong>~₹27.9 Lakhs</strong></p>
        <p class="mb-0">After-tax difference: <strong>₹12.7 Lakhs more</strong> with the equity fund over 10 years.</p>
      </div>

      <h5>2. The Hidden Tax Disadvantage of FDs</h5>
      <p>
        FD interest is added to your income every year and taxed at your slab rate — even if you 
        reinvest it. At a 30% tax bracket, your 7% FD effectively becomes a <strong>4.9% post-tax return</strong>. 
        After 6% inflation, your real return is <strong>−1.1%</strong>. You are losing purchasing power 
        in a "safe" FD.
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">After-Tax, After-Inflation Return Comparison</h4>
        <table style="width:100%; font-size:0.9rem; border-collapse:collapse;">
          <tr style="background:#f4f7f6; border-bottom:1px solid #ccc;"><th style="padding:6px;text-align:left;">Instrument</th><th style="padding:6px;">Gross Return</th><th style="padding:6px;">Post-Tax (30%)</th><th style="padding:6px;">Real Return</th></tr>
          <tr style="border-bottom:1px solid #eee;"><td style="padding:6px;">Savings Account</td><td style="padding:6px;">3.5%</td><td style="padding:6px;">2.45%</td><td style="padding:6px;color:red;">-3.55%</td></tr>
          <tr style="border-bottom:1px solid #eee;"><td style="padding:6px;">Bank FD</td><td style="padding:6px;">7%</td><td style="padding:6px;">4.9%</td><td style="padding:6px;color:red;">-1.1%</td></tr>
          <tr style="border-bottom:1px solid #eee;"><td style="padding:6px;">Debt Mutual Fund</td><td style="padding:6px;">7.5%</td><td style="padding:6px;">5.25%</td><td style="padding:6px;color:orange;">-0.75%</td></tr>
          <tr><td style="padding:6px;"><strong>Equity MF (LTCG)</strong></td><td style="padding:6px;"><strong>12%</strong></td><td style="padding:6px;"><strong>~10.8%</strong></td><td style="padding:6px;color:green;"><strong>+4.5%</strong></td></tr>
        </table>
        <p class="mb-0 mt-2 text-muted small">Inflation assumed at 6%. Only equity mutual fund generates positive real returns.</p>
      </div>

      <h5>3. When FD Is the Right Choice</h5>
      <ul>
        <li><strong>Emergency Fund:</strong> 3–6 months of expenses should be in FD or liquid fund — safety and instant access matter more than returns here.</li>
        <li><strong>Money needed within 1–2 years:</strong> Don't risk equity volatility for a near-term goal.</li>
        <li><strong>Senior citizens on fixed income:</strong> Capital preservation + guaranteed interest is valid at this life stage.</li>
        <li><strong>Very conservative temperament:</strong> If a 30% market drop would cause you to panic-sell, FD is better than equity.</li>
      </ul>

      <h5>4. When Mutual Fund Wins Every Time</h5>
      <ul>
        <li>Money for goals that are 3+ years away</li>
        <li>Retirement corpus building (10–30 year horizon)</li>
        <li>Child's education fund (10–15 years away)</li>
        <li>Any investor in a 20–30% tax bracket building long-term wealth</li>
      </ul>

      <h5>5. The Ideal Portfolio Structure</h5>
      <p>Don't think of it as FD vs Mutual Funds — use both for different buckets:</p>
      <ul>
        <li><strong>Emergency Bucket:</strong> 3–6 months expenses in Savings Account + Liquid Fund</li>
        <li><strong>Short-Term Bucket (1–3 years):</strong> Bank FD or Short Duration Debt Fund</li>
        <li><strong>Medium-Term Bucket (3–5 years):</strong> Hybrid / Conservative Hybrid Fund</li>
        <li><strong>Long-Term Bucket (5+ years):</strong> Equity Mutual Funds via SIP</li>
      </ul>
    `
  },

  // ==================== MODULE 4: LONG-TERM THINKING ====================

  'compounding': {
    title: 'Compounding Math',
    moduleLabel: 'Module 4',
    lessonLabel: 'Lesson 1',
    headline: 'The Magic of <br><span style="color: var(--brand-gold)">Compounding</span>',
    subtitle: 'Why Einstein called compounding the 8th wonder — and the math that proves him right.',
    prev: { slug: 'fd-vs-mutual-fund', title: 'FD vs Mutual Funds' },
    next: { slug: 'time-in-market', title: 'Time in the Market' },
    content: `
      <p class="caps-drop">
        Compounding is deceptively simple: you earn returns on your principal, and then you earn 
        returns on those returns. In the early years, the effect feels modest. But give it two 
        or three decades, and it becomes the closest thing to financial alchemy — turning modest 
        monthly savings into generational wealth. This is the single most important concept in 
        all of personal finance.
      </p>

      <h5>1. The Compound Interest Formula</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">A = P × (1 + r)ⁿ</h4>
        <p>A = Final Amount | P = Principal | r = Annual return | n = Years</p>
        <hr style="border-color:#ccc">
        <p>₹1,00,000 at 12% per year:</p>
        <p>After 10 years → <strong>₹3,10,585</strong></p>
        <p>After 20 years → <strong>₹9,64,629</strong></p>
        <p>After 30 years → <strong>₹29,95,992</strong> (30× original investment!)</p>
        <p class="mb-0 text-muted small">Notice: the last 10 years (20–30) added ₹20 lakhs, while the first 20 years added only ₹8.6 lakhs. Compounding is exponential — it accelerates with time.</p>
      </div>

      <h5>2. The J-Curve — Why Patience Is Mandatory</h5>
      <p>
        Compounding growth is not linear — it follows a J-curve. The first decade feels painfully 
        slow. The second decade picks up. The third decade is explosive. Most investors give up 
        in the flat early phase and miss the rocket-ship later phase. This is the compounding trap.
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">₹10,000/month SIP at 12% — Decade by Decade</h4>
        <p>After 10 years invested: Corpus = <strong>₹23.2 Lakhs</strong> (invested ₹12L)</p>
        <p>After 20 years invested: Corpus = <strong>₹98.9 Lakhs</strong> (invested ₹24L)</p>
        <p class="mb-0">After 30 years invested: Corpus = <strong>₹3.53 Crore</strong> (invested ₹36L)</p>
      </div>
      <p>
        In the third decade, compounding added <strong>₹2.54 Crore</strong> — more than the entire 
        first two decades combined. The money you invested in your 20s is worth 8–10× more than 
        the money you invest in your 40s.
      </p>

      <h5>3. The Early-Start Advantage — Priya vs Rahul</h5>
      <p>
        Priya starts investing ₹5,000/month at age 22, stops at 32 (invests for only 10 years), 
        then lets it compound untouched until 60. Rahul invests ₹5,000/month from 32 to 60 
        (invests for 28 years). Both earn 12% per year. Who wins?
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">The Early Bird Wins — Always</h4>
        <p>Priya (22–32, 10 years): Corpus at 32 = ₹11.5 Lakhs. At 60 (28 more years of compounding): <strong>₹3.3 Crore</strong></p>
        <p>Rahul (32–60, 28 years): Total invested = ₹16.8 Lakhs: <strong>₹2.1 Crore</strong></p>
        <p class="mb-0">Priya invested less than one-third of what Rahul did — but ended up with <strong>57% more wealth</strong>. Time is the ultimate advantage.</p>
      </div>

      <h5>4. The Rule of 72 — Instant Mental Math</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Years to Double = 72 ÷ Annual Return %</h4>
        <p>At 6% (FD): doubles every <strong>12 years</strong></p>
        <p>At 9% (Conservative equity): doubles every <strong>8 years</strong></p>
        <p>At 12% (Equity fund): doubles every <strong>6 years</strong></p>
        <p class="mb-0">At 15% (Mid/small cap): doubles every <strong>4.8 years</strong> — in 30 years, ₹1 lakh becomes ₹64 lakhs</p>
      </div>

      <h5>5. Compounding Killers — What Destroys the Chain</h5>
      <ul>
        <li><strong>Withdrawing early</strong> — every premature redemption resets the compounding chain on that portion</li>
        <li><strong>High expense ratios</strong> — a 1% higher ER means your effective return is 1% lower, costing ₹31L+ over 25 years on ₹10L</li>
        <li><strong>Stopping SIP during crashes</strong> — you miss the cheapest units and the strongest recovery gains</li>
        <li><strong>Frequent fund switching</strong> — triggers capital gains tax each time, and restarts the compounding clock</li>
        <li><strong>Inflation ignorance</strong> — investing in low-return instruments means negative real compounding</li>
      </ul>
    `
  },

  'time-in-market': {
    title: 'Time in the Market',
    moduleLabel: 'Module 4',
    lessonLabel: 'Lesson 2',
    headline: 'Time in the Market<br><span style="color: var(--brand-gold)"> Beats Timing the Market</span>',
    subtitle: 'Why waiting for the "right time" is the costliest strategy — backed by hard data.',
    prev: { slug: 'compounding', title: 'Compounding Math' },
    next: { slug: 'tax-planning', title: 'Tax Planning & Efficiency' },
    content: `
      <p class="caps-drop">
        "I'll invest once the market corrects a bit." This sentence has cost Indian investors 
        thousands of crores in missed wealth. The financial media makes it seem like the market 
        is always either dangerously high or dangerously crashing — so most people are permanently 
        in "wait and watch" mode. Study after study, across every market in the world, shows 
        the same conclusion: time <em>in</em> the market beats timing the market, every time.
      </p>

      <h5>1. The Devastating Cost of Missing Just 10 Days</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Nifty 50: 20 Years of Data (2004–2024)</h4>
        <p>Fully invested throughout: <strong>~13.5% CAGR</strong></p>
        <p>Missed the 10 best days: ~<strong>9.1% CAGR</strong></p>
        <p>Missed the 20 best days: ~<strong>6.3% CAGR</strong></p>
        <p class="mb-0">Missed the 30 best days: ~<strong>3.8% CAGR</strong> — barely beating inflation</p>
      </div>
      <p>
        The cruel irony: the <strong>10 best days almost always occur within 2 weeks of the 10 worst days</strong>. 
        If you exit during a crash (to "protect" yourself), you miss the fastest recovery days. 
        You cannot time exits without also missing the gains.
      </p>

      <h5>2. The Paralysis of Prediction</h5>
      <p>
        No one — not Warren Buffett, not the RBI Governor, not the smartest hedge fund manager — 
        can consistently and reliably predict short-term market movements. There is an entire 
        academic field (Efficient Market Hypothesis) built on the evidence that prices already 
        incorporate all publicly available information. If you knew the market was going to fall, 
        so would everyone else — and the fall would already have happened.
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">The Coin Flip Reality of Market Timing</h4>
        <p>To successfully time the market you must be right <strong>twice</strong>: when to exit AND when to re-enter.</p>
        <p>Probability of being right both times: 50% × 50% = <strong>25%</strong></p>
        <p class="mb-0">Probability of timing the market consistently over 10 attempts: 0.5¹⁰ = <strong>0.1%</strong></p>
      </div>

      <h5>3. The "Always High" Illusion</h5>
      <p>
        Every generation of Indian investors has believed the market was "at an all-time high" 
        and too expensive to enter. In 2010, the Nifty was at 6,000 and people said "it's too high." 
        In 2015 at 9,000, "too high." In 2020 at 12,000, "too high." In 2024, it crossed 24,000.
      </p>
      <p>
        All-time highs are <strong>normal in a growing economy</strong>. If you only invest at lows, 
        you wait forever, because today's "high" is always tomorrow's "low" in hindsight.
      </p>

      <h5>4. The Simple, Mathematically Optimal Strategy</h5>
      <ul>
        <li><strong>Start now.</strong> Not on the 1st of next month. Not after the election results. Now.</li>
        <li><strong>Invest regularly via SIP.</strong> Remove the decision entirely — automation removes emotion.</li>
        <li><strong>Increase SIP amount annually</strong> with income growth (10% step-up).</li>
        <li><strong>Ignore market noise.</strong> Turn off financial news. It is designed to create anxiety, not wealth.</li>
        <li><strong>Review once a year</strong> — to rebalance asset allocation, not to predict or react to markets.</li>
      </ul>

      <h5>5. What Waiting Actually Costs</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">The Price of a 1-Year Delay</h4>
        <p>₹10,000/month SIP, 12% return, for 30 years: → <strong>₹3.53 Crore</strong></p>
        <p>Same SIP but starting 1 year later (29 years): → <strong>₹3.12 Crore</strong></p>
        <p class="mb-0">Cost of waiting just 1 year: <strong>₹41 Lakhs</strong></p>
      </div>
    `
  },

  'tax-planning': {
    title: 'Tax Planning & Efficiency',
    moduleLabel: 'Module 4',
    lessonLabel: 'Lesson 3',
    headline: 'Tax Planning <br><span style="color: var(--brand-gold)">& Efficiency</span>',
    subtitle: 'Legal strategies to reduce your tax burden while building wealth — updated for Budget 2024.',
    prev: { slug: 'time-in-market', title: 'Time in the Market' },
    next: { slug: 'insurance-basics', title: 'Insurance Basics' },
    content: `
      <p class="caps-drop">
        Taxes are the largest single drain on investment returns — larger than expense ratios, 
        larger than market volatility. But with disciplined planning, Indian investors can 
        legally and ethically reduce their tax burden substantially. The goal is not to evade 
        taxes — it is to structure your investments so that the government's share is minimized 
        within the rules they themselves have created to encourage long-term investing.
      </p>

      <h5>1. Capital Gains Tax — The Updated Rules (Post Budget 2024)</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Equity Mutual Fund Tax Rates</h4>
        <p>Held less than 12 months → <strong>20% Short Term Capital Gains (STCG)</strong></p>
        <p>Held 12+ months → <strong>12.5% Long Term Capital Gains (LTCG)</strong></p>
        <p>LTCG Exemption: First <strong>₹1,25,000 per year is completely tax-free</strong></p>
        <hr style="border-color:#ccc">
        <p class="mb-0 text-muted small">Note: Budget 2024 increased LTCG rate from 10% to 12.5% and increased exemption from ₹1L to ₹1.25L. No indexation benefit for equity funds.</p>
      </div>

      <h5>2. Section 80C — ₹45,000 Saved Every Year</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">80C Deduction = Up to ₹1,50,000 per year</h4>
        <p>Tax Saved (30% bracket): 1,50,000 × 30% = <strong>₹45,000/year</strong></p>
        <p>Tax Saved (20% bracket): 1,50,000 × 20% = <strong>₹30,000/year</strong></p>
        <hr style="border-color:#ccc">
        <p>Best 80C options: <strong>ELSS (3-yr lock-in, 12–15% returns)</strong> → PPF (15-yr lock-in, 7.1%) → NPS (additional ₹50K under 80CCD)</p>
        <p class="mb-0">ELSS wins for most investors: shortest lock-in, market-linked returns, eligible for LTCG treatment post lock-in.</p>
      </div>

      <h5>3. Tax Harvesting — Earn ₹15,625 for Free Every Year</h5>
      <p>
        Since ₹1.25 lakh of LTCG is tax-free every financial year, smart investors "harvest" 
        their gains annually to reset their cost basis and eliminate future tax liability:
      </p>
      <ul>
        <li><strong>Step 1:</strong> In March (before financial year end), calculate your LTCG from equity funds.</li>
        <li><strong>Step 2:</strong> If gains are approaching ₹1.25 lakh, redeem units worth up to that amount.</li>
        <li><strong>Step 3:</strong> Immediately reinvest the same amount — same fund or similar fund.</li>
        <li><strong>Step 4:</strong> Your new cost basis is higher → future capital gains are lower.</li>
      </ul>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Annual Tax Saving from Harvesting</h4>
        <p>Max free LTCG: ₹1,25,000 × 12.5% = <strong>₹15,625 saved per year</strong></p>
        <p class="mb-0">Over 20 years, with compounding of reinvested savings: <strong>₹10–15 Lakhs in cumulative tax saved</strong></p>
      </div>

      <h5>4. Growth Option vs IDCW — Always Choose Growth</h5>
      <p>
        IDCW (formerly Dividend) option pays out periodic dividends — but these come 
        <em>from your own NAV</em>, not as extra profit. And they're taxed at your slab rate every year.
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">IDCW vs Growth — The Hidden Cost</h4>
        <p>IDCW: NAV falls by ₹3 when ₹3 dividend is paid. You receive ₹3 and pay 30% tax = ₹0.90 tax. Net: ₹2.10</p>
        <p>Growth: Same ₹3 stays in NAV, compounding at 12%. In 10 years that ₹3 becomes <strong>₹9.30</strong></p>
        <p class="mb-0">Choose Growth unless you genuinely need periodic income (like retirement). The tax drag of IDCW kills long-term compounding.</p>
      </div>

      <h5>5. Old vs New Tax Regime — Which Is Better for Investors?</h5>
      <p>
        From FY 2023–24, the New Tax Regime is the default. Key differences for mutual fund investors:
      </p>
      <ul>
        <li><strong>Old Regime:</strong> Higher slab rates but allows deductions (80C, HRA, Home Loan interest, etc.). Beneficial if your total deductions exceed ~₹3.5 lakhs.</li>
        <li><strong>New Regime:</strong> Lower slab rates, no deductions. Beneficial for high earners with few deductions, or those who've already maxed 80C.</li>
        <li><strong>Key Point:</strong> Capital gains from mutual funds (STCG/LTCG) are taxed at flat rates regardless of which regime you choose — regime choice doesn't affect this.</li>
        <li>Always calculate your tax under both regimes before filing. The difference can be ₹20,000–₹80,000 per year.</li>
      </ul>
    `
  },

  // ==================== MODULE 5: PROTECTION ====================

  'insurance-basics': {
    title: 'Insurance Basics',
    moduleLabel: 'Module 5',
    lessonLabel: 'Lesson 1',
    headline: 'Insurance <br><span style="color: var(--brand-gold)">Basics</span>',
    subtitle: 'Protect everything you are building — the foundation without which all investing is fragile.',
    prev: { slug: 'tax-planning', title: 'Tax Planning & Efficiency' },
    next: null,
    content: `
      <p class="caps-drop">
        You have read about compounding, SIPs, tax efficiency, and building wealth over decades. 
        But all of it rests on one critical assumption: that you will be alive and healthy to 
        see it through. A single medical emergency, a disability, or an unexpected death can 
        wipe out years of carefully built savings overnight. Insurance is not an expense — it 
        is the foundation on which every financial plan must stand.
      </p>

      <div class="illustration-frame">
        <img src="/assets/insurance-shield.png" alt="Insurance Shield Concept" loading="lazy">
        <p class="mt-3 small text-muted">"Build the roof before the rain comes. Insurance is always bought before it's needed."</p>
      </div>

      <h5>1. The Two Non-Negotiables Before Any Investing</h5>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Get These First — Then Invest</h4>
        <p>1. <strong>Term Life Insurance</strong> — protects your family's financial future if you pass away</p>
        <p class="mb-0">2. <strong>Health Insurance</strong> — protects your savings from being wiped out by medical bills</p>
      </div>
      <p>
        A single cancer treatment or cardiac surgery in India can cost ₹5–20 lakhs. 
        Without health insurance, this wipes out years of SIP savings in days. 
        Without term insurance, your family inherits your debts but not your income.
      </p>

      <h5>2. Term Life Insurance — Pure Protection at Low Cost</h5>
      <p>
        Term insurance is the simplest, purest, and most affordable form of life insurance. 
        It pays a lump sum (the "sum assured") to your nominee only if you pass away during the policy term. 
        There is no maturity benefit — and that's exactly why it's so cheap and so effective.
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Recommended Sum Assured Formula</h4>
        <p><strong>Sum Assured = 10–15× Your Annual Income</strong></p>
        <p>Annual Income = ₹10 Lakhs → Cover needed = ₹1 Crore to ₹1.5 Crore</p>
        <p>Cost of ₹1 Crore term cover (age 30, 30-year term): ~<strong>₹10,000–15,000/year</strong></p>
        <p class="mb-0">The same ₹1 Crore in an endowment/ULIP plan costs ₹1,00,000+ per year — 10× more, for far worse returns.</p>
      </div>
      <ul>
        <li><strong>Buy early:</strong> A ₹1 Crore cover at age 25 costs ~₹7,000/year. The same at age 40 costs ~₹25,000/year. Premiums lock in at purchase age.</li>
        <li><strong>Buy online:</strong> Online term plans are 30–40% cheaper than offline due to lower distribution costs.</li>
        <li><strong>Choose the right term:</strong> Cover yourself until age 60–65 (or until your projected retirement corpus is built). If your SIP hits ₹2 Crore by 55, you're self-insured from that point.</li>
        <li><strong>Avoid return-of-premium riders:</strong> They significantly increase cost for negligible benefit. Pure term is always better.</li>
      </ul>

      <h5>3. Health Insurance — The SIP Protector</h5>
      <p>
        Employer-provided health insurance is inadequate for three reasons: the cover is often too 
        low (₹3–5 lakh), it disappears when you change jobs, and it doesn't cover pre-existing 
        conditions during the initial waiting period. You need your own personal health policy.
      </p>
      <ul>
        <li><strong>Minimum cover:</strong> ₹10–20 lakhs per person in metro cities; ₹5–10 lakhs in smaller cities</li>
        <li><strong>Family floater plans:</strong> Cover the entire family under one sum insured — more cost-effective than individual plans, but choose a sum large enough that a hospitalization doesn't exhaust the full limit</li>
        <li><strong>Super top-up plans:</strong> Once you have a base policy (₹5L), a super top-up of ₹20–50L kicks in above the deductible — provides massive coverage at very low cost</li>
        <li><strong>Buy young, buy healthy:</strong> Pre-existing conditions are excluded for 2–4 years. Buy health insurance before you have any conditions, while you're healthy and premiums are low</li>
      </ul>

      <h5>4. The Golden Rule: Insurance ≠ Investment</h5>
      <p>
        India's insurance industry has long sold products that mix insurance and investment — 
        ULIPs, endowment plans, money-back policies. These are among the worst financial 
        products ever designed:
      </p>
      <div class="formula-box">
        <h4 style="font-family: 'Playfair Display', serif; color: var(--brand-green);">Why ULIPs and Endowment Plans Fail</h4>
        <p>Endowment: Premium = ₹50,000/year | Cover = ₹10 Lakhs | Returns: ~5–6% (barely above FD)</p>
        <p>Better strategy: Term Plan = ₹12,000/year for ₹1 Crore cover + Invest remaining ₹38,000 in mutual funds</p>
        <p class="mb-0">After 20 years: Endowment corpus ≈ ₹18 Lakhs. Mutual Fund corpus on ₹38,000/year at 12% = <strong>₹34 Lakhs</strong> — plus 10× more life cover</p>
      </div>
      <p>
        The rule is absolute: <strong>buy insurance for protection, invest separately for wealth</strong>. 
        Never mix the two. If you currently hold ULIPs or endowment plans, calculate if surrendering 
        them and switching to term + mutual funds makes mathematical sense (often it does).
      </p>

      <h5>5. Your Complete Insurance Checklist</h5>
      <ul>
        <li>✅ Term life insurance: 10–15× annual income, until age 60–65</li>
        <li>✅ Health insurance: ₹10–20L cover, separate from employer, includes family</li>
        <li>✅ No ULIPs, endowment, or money-back policies</li>
        <li>✅ Emergency fund: 3–6 months expenses in liquid fund (your self-insurance for income disruption)</li>
        <li>✅ Critical illness rider: Consider adding to term or health plan for additional protection against cancer, heart attack, stroke</li>
      </ul>
    `
  }
};

// Order for sequential prev/next navigation
const lessonOrder = [
  'what-is-mutual-fund', 'what-is-sip', 'nav-explained',
  'sip-deep-dive', 'lumpsum', 'swp',
  'risk-volatility', 'inflation', 'fd-vs-mutual-fund',
  'compounding', 'time-in-market', 'tax-planning',
  'insurance-basics'
];

module.exports = { lessons, lessonOrder };