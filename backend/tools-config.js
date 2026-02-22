// ============================================================
// tools-config.js
// Add a new calculator here → it automatically gets a page at
// /calculator/:slug and appears in the tools hub.
//
// Each tool needs:
//   slug        – URL-safe string, used as the route param
//   title       – Display name
//   icon        – Font Awesome class
//   color       – CSS hex for the chart / accent colour
//   time        – Estimated time to use ("1 min", "3 min" …)
//   level       – "Beginner" | "Intermediate" | "Advanced"
//   popular     – true | false  (shows "Popular" badge on hub)
//   category    – Groups tools on the hub page
//   description – Short sentence shown on the hub card
//   about       – 2-3 sentence paragraph for the tool page
//   example     – Practical example text for the tool page
//   steps       – Array of { title, body } for the how-it-works section
//   inputs      – Array of { id, label, defaultValue, type:"number"|"select", options:[] }
//   outputs     – Array of { id, label, color:"primary"|"slate"|"green"|"gold" }
//   primaryOutput – id of the main big-number display
//   chartType   – "line" | "bar" | "doughnut"
//   calculateFn – String name of the JS function (defined in calculator.ejs <script>)
// ============================================================

const tools = {

  // ─────────────────────────────────────────────────────────────
  // CATEGORY: SIP & SYSTEMATIC INVESTING
  // ─────────────────────────────────────────────────────────────

  'sip': {
    slug: 'sip',
    title: 'SIP Calculator',
    icon: 'fas fa-chart-line',
    color: '#4F46E5',
    time: '2 min',
    level: 'Beginner',
    popular: true,
    category: 'SIP & Systematic Investing',
    description: 'Calculate how a monthly SIP grows into a large corpus through the power of compounding.',
    about: 'The SIP Calculator helps you visualise the power of compounding. Unlike a normal savings account, an SIP puts your money to work every month, earning returns on top of previous returns.',
    example: 'Investing ₹10,000 every month for 15 years at 12% annual return results in a total corpus of ₹50.46 Lakhs — more than half of that is pure profit from compounding.',
    steps: [
      { title: 'Calculate Monthly Growth', body: 'We take your expected annual return and break it down into a monthly growth rate so interest is applied 12 times a year.' },
      { title: 'The Compounding Cycle', body: 'Each month, your new investment is added to your existing balance. The monthly rate is applied to the entire sum — this repeats for every month.' },
      { title: 'Generating the Result', body: 'After the final month, we subtract total contributions from the final balance to show exactly how much wealth the market generated.' }
    ],
    inputs: [
      { id: 'monthlyAmount', label: 'Monthly Investment (₹)', defaultValue: 10000 },
      { id: 'years',         label: 'Duration (Years)',        defaultValue: 15 },
      { id: 'annualReturn',  label: 'Expected Return (%)',     defaultValue: 12 }
    ],
    outputs: [
      { id: 'displayTotal',    label: 'Expected Future Value', color: 'primary' },
      { id: 'displayInvested', label: 'Total Invested',        color: 'slate' },
      { id: 'displayGain',     label: 'Wealth Gained',         color: 'green' }
    ],
    primaryOutput: 'displayTotal',
    chartType: 'line'
  },

  'step-up-sip': {
    slug: 'step-up-sip',
    title: 'Step-up SIP Calculator',
    icon: 'fas fa-stairs',
    color: '#E11D48',
    time: '3 min',
    level: 'Intermediate',
    popular: false,
    category: 'SIP & Systematic Investing',
    description: 'See how increasing your SIP by a fixed % every year dramatically boosts your final corpus.',
    about: 'A Step-up SIP lets you increase your monthly contribution by a fixed percentage every year. As your income grows, your savings grow with it — and the compounding impact is enormous.',
    example: 'A standard ₹10k SIP for 20 years at 12% yields ₹1 Crore. Stepping it up by 10% every year takes that to over ₹2.2 Crores!',
    steps: [
      { title: 'Annual Increments', body: 'Every 12 months, the monthly installment is recalculated by adding the step-up % to the previous year\'s amount.' },
      { title: 'Monthly Compounding', body: 'Each monthly installment earns interest, compounded monthly. Earlier installments have more time to grow.' },
      { title: 'Wealth vs. Investment', body: 'The chart shows the widening gap between your total invested (dashed) and total wealth (solid). That gap is compounded returns.' }
    ],
    inputs: [
      { id: 'monthlyAmount', label: 'Initial Monthly SIP (₹)', defaultValue: 10000 },
      { id: 'stepUp',        label: 'Annual Step-up (%)',       defaultValue: 10 },
      { id: 'years',         label: 'Duration (Years)',          defaultValue: 15 },
      { id: 'annualReturn',  label: 'Expected Return (%)',       defaultValue: 12 }
    ],
    outputs: [
      { id: 'displayFinal',    label: 'Expected Wealth',  color: 'primary' },
      { id: 'displayInvested', label: 'Total Invested',   color: 'slate' },
      { id: 'displayGains',    label: 'Total Gains',      color: 'green' }
    ],
    primaryOutput: 'displayFinal',
    chartType: 'line'
  },

  'swp': {
    slug: 'swp',
    title: 'SWP Calculator',
    icon: 'fas fa-money-bill-transfer',
    color: '#0891B2',
    time: '2 min',
    level: 'Advanced',
    popular: false,
    category: 'SIP & Systematic Investing',
    description: 'See how long your retirement corpus can sustain regular monthly withdrawals.',
    about: 'A Systematic Withdrawal Plan (SWP) lets you withdraw a fixed amount every month from your mutual fund corpus while the remaining balance continues to earn returns.',
    example: 'A ₹50 Lakh corpus earning 10% annually can sustain ₹40,000/month withdrawals for over 20 years before running out.',
    steps: [
      { title: 'Starting Balance', body: 'We begin with your total invested corpus that you\'ve accumulated over the years.' },
      { title: 'Monthly Withdrawal & Growth', body: 'Each month, the withdrawal is deducted but the remaining balance continues earning the monthly return.' },
      { title: 'Corpus Depletion Point', body: 'The chart tracks when your corpus reduces to zero, showing how long your wealth can sustain your withdrawals.' }
    ],
    inputs: [
      { id: 'corpus',       label: 'Total Corpus (₹)',          defaultValue: 5000000 },
      { id: 'withdrawal',   label: 'Monthly Withdrawal (₹)',    defaultValue: 40000 },
      { id: 'annualReturn', label: 'Expected Return (%)',        defaultValue: 10 }
    ],
    outputs: [
      { id: 'displayMonths', label: 'Corpus Lasts (Months)', color: 'primary' },
      { id: 'displayYears',  label: 'Corpus Lasts (Years)',  color: 'slate' },
      { id: 'displayTotal',  label: 'Total Withdrawn',       color: 'green' }
    ],
    primaryOutput: 'displayMonths',
    chartType: 'line'
  },

  'sip-vs-lumpsum': {
    slug: 'sip-vs-lumpsum',
    title: 'SIP vs Lumpsum',
    icon: 'fas fa-scale-balanced',
    color: '#7C3AED',
    time: '2 min',
    level: 'Beginner',
    popular: false,
    category: 'SIP & Systematic Investing',
    description: 'Compare the final value of a monthly SIP versus investing the same total amount as a lumpsum.',
    about: 'A common question: is it better to invest a lumpsum all at once or spread it via monthly SIPs? This calculator shows you both outcomes side-by-side so you can decide.',
    example: 'Investing ₹1.2L/year as a ₹10,000/month SIP vs a ₹1.2L lumpsum at the start of each year — the lumpsum wins short-term, but SIP reduces timing risk.',
    steps: [
      { title: 'Define the Same Total', body: 'We calculate the annual equivalent of your monthly SIP and use that as the lumpsum per year for a fair comparison.' },
      { title: 'Run Both Projections', body: 'Both are compounded at the same annual return — SIP monthly, lumpsum annually — over your chosen duration.' },
      { title: 'Compare Side by Side', body: 'The chart overlays both growth curves so you can see which approach wins at different time horizons.' }
    ],
    inputs: [
      { id: 'monthlyAmount', label: 'Monthly SIP Amount (₹)', defaultValue: 10000 },
      { id: 'years',         label: 'Duration (Years)',        defaultValue: 15 },
      { id: 'annualReturn',  label: 'Expected Return (%)',     defaultValue: 12 }
    ],
    outputs: [
      { id: 'displaySIP',      label: 'SIP Final Value',      color: 'primary' },
      { id: 'displayLumpsum',  label: 'Lumpsum Final Value',  color: 'green' },
      { id: 'displayDiff',     label: 'Difference',           color: 'slate' }
    ],
    primaryOutput: 'displaySIP',
    chartType: 'line'
  },


  // ─────────────────────────────────────────────────────────────
  // CATEGORY: LUMPSUM & ONE-TIME INVESTING
  // ─────────────────────────────────────────────────────────────

  'lumpsum': {
    slug: 'lumpsum',
    title: 'Lumpsum Calculator',
    icon: 'fas fa-coins',
    color: '#4F46E5',
    time: '1 min',
    level: 'Beginner',
    popular: true,
    category: 'Lumpsum & One-Time Investing',
    description: 'Calculate returns on a one-time investment like a bonus, inheritance, or savings.',
    about: 'A Lumpsum investment is a single, one-time deposit into a financial instrument. Your entire capital starts earning returns from Day 1, allowing the power of time to maximise wealth growth.',
    example: 'Investing ₹1,00,000 for 10 years at 12% return results in ₹3,10,585 — your initial capital triples without adding a single extra rupee.',
    steps: [
      { title: 'Establishing the Base', body: 'We start with your total one-time investment and the expected yearly growth rate.' },
      { title: 'Yearly Compounding', body: 'Each year, interest is earned on your total balance — original money PLUS all previous profits.' },
      { title: 'Calculating Pure Gains', body: 'We separate your original deposit from the end-value to show exactly how much Wealth Gain was created by the market.' }
    ],
    inputs: [
      { id: 'lumpsumAmount', label: 'One-Time Investment (₹)', defaultValue: 100000 },
      { id: 'annualReturn',  label: 'Expected Return (%)',     defaultValue: 12 },
      { id: 'years',         label: 'Duration (Years)',        defaultValue: 10 }
    ],
    outputs: [
      { id: 'displayTotal',    label: 'Estimated Future Value', color: 'primary' },
      { id: 'displayInvested', label: 'Invested Amount',        color: 'slate' },
      { id: 'displayGain',     label: 'Wealth Gained',          color: 'green' }
    ],
    primaryOutput: 'displayTotal',
    chartType: 'line'
  },

  'cagr': {
    slug: 'cagr',
    title: 'CAGR Calculator',
    icon: 'fas fa-percent',
    color: '#4F46E5',
    time: '1 min',
    level: 'Intermediate',
    popular: false,
    category: 'Lumpsum & One-Time Investing',
    description: 'Measure the annualised growth rate of any investment to benchmark performance.',
    about: 'CAGR (Compound Annual Growth Rate) is the best way to measure investment performance over time. It tells you the average annual return, assuming a steady growth rate every year.',
    example: 'If ₹1,00,000 grows to ₹2,50,000 in 5 years, total return is 150%. But your CAGR is 20.11% — meaning the money grew ~20% per year effectively.',
    steps: [
      { title: 'Compare Total Change', body: 'We look at the gap between start value and end value to find the total absolute return.' },
      { title: 'Factor in Time', body: 'Unlike simple interest, CAGR accounts for compounding — we calculate the geometric mean to find the precise annual rate.' },
      { title: 'Smoothing the Volatility', body: 'CAGR assumes a steady rate of growth. In reality markets fluctuate, but CAGR gives a single "smoothed" number for easy comparison.' }
    ],
    inputs: [
      { id: 'initialValue', label: 'Initial Investment (₹)', defaultValue: 100000 },
      { id: 'finalValue',   label: 'Final Value (₹)',         defaultValue: 250000 },
      { id: 'years',        label: 'Duration (Years)',         defaultValue: 5 }
    ],
    outputs: [
      { id: 'displayCAGR',   label: 'CAGR',                  color: 'primary' },
      { id: 'displayGrowth', label: 'Total Absolute Growth',  color: 'green' }
    ],
    primaryOutput: 'displayCAGR',
    chartType: 'line'
  },

  'xirr': {
    slug: 'xirr',
    title: 'XIRR Calculator',
    icon: 'fas fa-chart-area',
    color: '#059669',
    time: '3 min',
    level: 'Advanced',
    popular: false,
    category: 'Lumpsum & One-Time Investing',
    description: 'Calculate the true annualised return of irregular cash flows — like real SIP investments.',
    about: 'CAGR works for a single investment, but XIRR accounts for multiple investments made on different dates at different amounts — making it the gold standard for measuring SIP performance.',
    example: 'A mutual fund statement showing different SIP dates and amounts gives you XIRR — the true return that accounts for the exact timing of each rupee invested.',
    steps: [
      { title: 'Enter Cash Flows', body: 'Input each investment date and amount as a negative cash flow, and the final redemption as a positive.' },
      { title: 'Newton-Raphson Iteration', body: 'XIRR uses a mathematical iteration method to find the discount rate that makes the Net Present Value of all cash flows equal zero.' },
      { title: 'Annualised Result', body: 'The result is expressed as an annual percentage — directly comparable to FD rates, CAGR of indices, and other benchmarks.' }
    ],
    inputs: [
      { id: 'monthlyAmount', label: 'Monthly SIP (₹)',      defaultValue: 10000 },
      { id: 'years',         label: 'Duration (Years)',      defaultValue: 10 },
      { id: 'finalValue',    label: 'Current Value (₹)',     defaultValue: 2500000 }
    ],
    outputs: [
      { id: 'displayXIRR',     label: 'XIRR',           color: 'primary' },
      { id: 'displayInvested', label: 'Total Invested',  color: 'slate' },
      { id: 'displayGain',     label: 'Profit',          color: 'green' }
    ],
    primaryOutput: 'displayXIRR',
    chartType: 'bar'
  },


  // ─────────────────────────────────────────────────────────────
  // CATEGORY: RETIREMENT & LIFE PLANNING
  // ─────────────────────────────────────────────────────────────

  'retirement': {
    slug: 'retirement',
    title: 'Retirement Planner',
    icon: 'fas fa-umbrella-beach',
    color: '#0F172A',
    time: '3 min',
    level: 'Intermediate',
    popular: true,
    category: 'Retirement & Life Planning',
    description: 'Calculate the corpus needed for a comfortable retirement and see if you\'re on track.',
    about: 'Planning for retirement isn\'t just about how much you save — it\'s about what that money can actually buy in the future. This tool shows the difference between your actual corpus and its purchasing power after inflation.',
    example: 'If you need ₹1 Crore to retire today, in 30 years at 6% inflation you would actually need ₹5.74 Crores to maintain the exact same lifestyle.',
    steps: [
      { title: 'Compounding the Growth', body: 'We grow your current savings and future yearly investments using your expected return rate, compounded annually until retirement.' },
      { title: 'Discounting for Inflation', body: 'We calculate the "Real Value" — what that massive future sum is worth in today\'s money after reversing inflation.' },
      { title: 'Visualising the Gap', body: 'The chart shows two lines. The gap between Total Wealth and Inflation Adjusted represents purchasing power lost to rising costs.' }
    ],
    inputs: [
      { id: 'currentAge',       label: 'Current Age',           defaultValue: 25 },
      { id: 'retirementAge',    label: 'Retirement Age',        defaultValue: 60 },
      { id: 'currentSavings',   label: 'Current Corpus (₹)',    defaultValue: 500000 },
      { id: 'yearlyInvestment', label: 'Yearly Investment (₹)', defaultValue: 120000 },
      { id: 'expectedReturn',   label: 'Expected Return (%)',   defaultValue: 12 },
      { id: 'inflationRate',    label: 'Inflation Rate (%)',    defaultValue: 6 }
    ],
    outputs: [
      { id: 'displayCorpus',    label: 'Corpus at Retirement',     color: 'primary' },
      { id: 'displayRealValue', label: 'Inflation Adjusted Value', color: 'gold' }
    ],
    primaryOutput: 'displayCorpus',
    chartType: 'line'
  },

  'goal': {
    slug: 'goal',
    title: 'Goal Planner',
    icon: 'fas fa-bullseye',
    color: '#9333EA',
    time: '2 min',
    level: 'Beginner',
    popular: true,
    category: 'Retirement & Life Planning',
    description: 'Find exactly how much to invest every month to hit any financial goal.',
    about: 'Whether it\'s a down payment for a home, a child\'s education, or a luxury vacation, the Goal Planner tells you exactly how much you need to save every month to hit your target.',
    example: 'To reach ₹10 Lakhs in 10 years with a 12% return, you don\'t need ₹8,333/month — thanks to compounding, a monthly SIP of just ₹4,300 is enough!',
    steps: [
      { title: 'Defining the Target', body: 'We take your future financial goal and the time you have to achieve it as the primary constraints.' },
      { title: 'Reverse Compounding', body: 'Instead of calculating future value, we calculate the monthly amount required using the SIP future value formula rearranged for the monthly installment.' },
      { title: 'Visualising the Journey', body: 'The chart shows your expected wealth trajectory — notice how the curve steepens in later years as compounding accelerates.' }
    ],
    inputs: [
      { id: 'targetAmount', label: 'Target Amount (₹)',        defaultValue: 1000000 },
      { id: 'years',        label: 'Time Horizon (Years)',      defaultValue: 10 },
      { id: 'annualReturn', label: 'Expected Annual Return (%)', defaultValue: 12 }
    ],
    outputs: [
      { id: 'displaySIP',      label: 'Required Monthly SIP', color: 'primary' },
      { id: 'displayInvested', label: 'Total Investment',      color: 'slate' },
      { id: 'displayProfit',   label: 'Profit Needed',         color: 'green' }
    ],
    primaryOutput: 'displaySIP',
    chartType: 'line'
  },

  'fire': {
    slug: 'fire',
    title: 'FIRE Calculator',
    icon: 'fas fa-fire',
    color: '#EA580C',
    time: '3 min',
    level: 'Advanced',
    popular: false,
    category: 'Retirement & Life Planning',
    description: 'Calculate your FIRE number — the corpus needed to retire early and live off investments forever.',
    about: 'FIRE (Financial Independence, Retire Early) uses the "4% Rule" — you can safely withdraw 4% of your corpus every year indefinitely if invested in the right assets. This calculator finds that magic number.',
    example: 'If you spend ₹60,000/month (₹7.2L/year), your FIRE number is ₹7.2L ÷ 0.04 = ₹1.8 Crores — the corpus that sustains you forever at 4% withdrawal.',
    steps: [
      { title: 'Calculate Annual Expenses', body: 'Multiply your monthly spend by 12 to get the annual amount your corpus needs to sustain.' },
      { title: 'Apply the 4% Rule', body: 'Divide annual expenses by 0.04 — this is your FIRE number. The underlying portfolio returns 8-10%, sustaining 4% withdrawals inflation-adjusted.' },
      { title: 'Find the Timeline', body: 'Given your current savings rate and investment return, we calculate how many years until you hit your FIRE number.' }
    ],
    inputs: [
      { id: 'monthlyExpenses',  label: 'Monthly Expenses (₹)',        defaultValue: 60000 },
      { id: 'currentCorpus',    label: 'Current Savings (₹)',         defaultValue: 2000000 },
      { id: 'monthlySavings',   label: 'Monthly Savings (₹)',         defaultValue: 50000 },
      { id: 'annualReturn',     label: 'Expected Return (%)',          defaultValue: 12 },
      { id: 'inflationRate',    label: 'Inflation Rate (%)',           defaultValue: 6 }
    ],
    outputs: [
      { id: 'displayFIRE',   label: 'Your FIRE Number',     color: 'primary' },
      { id: 'displayYears',  label: 'Years to FIRE',        color: 'slate' },
      { id: 'displayAge',    label: 'FIRE Age (from 25)',   color: 'green' }
    ],
    primaryOutput: 'displayFIRE',
    chartType: 'line'
  },

  'life-insurance': {
    slug: 'life-insurance',
    title: 'Life Insurance Need',
    icon: 'fas fa-shield-heart',
    color: '#1a3c31',
    time: '2 min',
    level: 'Beginner',
    popular: false,
    category: 'Retirement & Life Planning',
    description: 'Calculate the exact term insurance cover your family needs to be financially secure.',
    about: 'Most people are severely underinsured. This calculator uses the Human Life Value method and the Income Replacement method to give you a scientifically calculated cover amount.',
    example: 'Annual income ₹10L, 25 years to retirement, 6% inflation: your Human Life Value is approximately ₹1.5 Crores — but most people only buy ₹25L cover.',
    steps: [
      { title: 'Income Replacement Method', body: 'Calculate how much corpus your family needs to generate your current income from investments alone (at 6-8% return).' },
      { title: 'Liability Adjustment', body: 'Add all outstanding loans (home, car, personal) and subtract existing investments to get the net cover needed.' },
      { title: 'Final Cover Amount', body: 'Round up to the nearest ₹25L and check the recommended cover for your age — always buy a 30-year term, not a 10-year one.' }
    ],
    inputs: [
      { id: 'annualIncome',  label: 'Annual Income (₹)',        defaultValue: 1000000 },
      { id: 'yearsToRetire', label: 'Years to Retirement',      defaultValue: 30 },
      { id: 'liabilities',   label: 'Total Liabilities (₹)',    defaultValue: 2000000 },
      { id: 'currentAssets', label: 'Current Investments (₹)',  defaultValue: 500000 }
    ],
    outputs: [
      { id: 'displayCover',       label: 'Recommended Cover', color: 'primary' },
      { id: 'displayHLV',         label: 'Human Life Value',  color: 'slate' },
      { id: 'displayAnnualPremium', label: 'Est. Premium/yr', color: 'green' }
    ],
    primaryOutput: 'displayCover',
    chartType: 'bar'
  },


  // ─────────────────────────────────────────────────────────────
  // CATEGORY: FIXED INCOME & DEPOSITS
  // ─────────────────────────────────────────────────────────────

  'fd': {
    slug: 'fd',
    title: 'FD Calculator',
    icon: 'fas fa-building-columns',
    color: '#4F46E5',
    time: '1 min',
    level: 'Beginner',
    popular: true,
    category: 'Fixed Income & Deposits',
    description: 'Estimate fixed deposit maturity value with compound interest for any tenure.',
    about: 'A Fixed Deposit (FD) is one of the safest investment options. You lock in a sum of money for a fixed period at a pre-decided interest rate, and the bank guarantees the maturity amount.',
    example: 'Deposit ₹1,00,000 for 5 years at 7.5% interest: by the end of the term you receive ₹1,43,563, including ₹43,563 as interest.',
    steps: [
      { title: 'Input Principal and Rate', body: 'The calculation starts with your initial deposit (Principal) and the annual interest rate offered by the bank.' },
      { title: 'Applying Yearly Compounding', body: 'Every year, interest is calculated on your total balance (Principal + previous interest). This ensures your money grows faster each year.' },
      { title: 'Determining Maturity', body: 'Once the tenure is complete, we provide the final maturity value and break down principal vs. interest earned.' }
    ],
    inputs: [
      { id: 'principal', label: 'Investment Amount (₹)', defaultValue: 100000 },
      { id: 'rate',      label: 'Interest Rate (%)',      defaultValue: 7.5 },
      { id: 'years',     label: 'Tenure (Years)',         defaultValue: 5 }
    ],
    outputs: [
      { id: 'displayMaturity',  label: 'Maturity Value',  color: 'primary' },
      { id: 'displayInvested',  label: 'Total Deposit',   color: 'slate' },
      { id: 'displayGain',      label: 'Interest Earned', color: 'green' }
    ],
    primaryOutput: 'displayMaturity',
    chartType: 'line'
  },

  'rd': {
    slug: 'rd',
    title: 'RD Calculator',
    icon: 'fas fa-piggy-bank',
    color: '#0891B2',
    time: '1 min',
    level: 'Beginner',
    popular: false,
    category: 'Fixed Income & Deposits',
    description: 'Calculate maturity value of a Recurring Deposit with monthly contributions.',
    about: 'A Recurring Deposit (RD) is like an FD but with monthly contributions — similar to an SIP but at guaranteed bank interest rates. Ideal for building a short-term corpus safely.',
    example: 'Depositing ₹5,000/month for 3 years at 7% RD rate gives a maturity value of approximately ₹2,00,161 on a total deposit of ₹1,80,000.',
    steps: [
      { title: 'Monthly Deposits', body: 'Each monthly deposit earns interest from the date it is deposited until maturity.' },
      { title: 'Quarterly Compounding', body: 'Banks compound RD interest quarterly. We use the standard formula: M = R × [(1+r)^n - 1] / (1 - (1+r)^(-1/3)).' },
      { title: 'Maturity Value', body: 'Sum of all compounded monthly deposits gives you the final maturity amount and total interest earned.' }
    ],
    inputs: [
      { id: 'monthlyDeposit', label: 'Monthly Deposit (₹)', defaultValue: 5000 },
      { id: 'rate',           label: 'Interest Rate (%)',    defaultValue: 7 },
      { id: 'years',          label: 'Tenure (Years)',       defaultValue: 3 }
    ],
    outputs: [
      { id: 'displayMaturity',  label: 'Maturity Value',  color: 'primary' },
      { id: 'displayInvested',  label: 'Total Deposited', color: 'slate' },
      { id: 'displayInterest',  label: 'Interest Earned', color: 'green' }
    ],
    primaryOutput: 'displayMaturity',
    chartType: 'bar'
  },

  'ppf': {
    slug: 'ppf',
    title: 'PPF Calculator',
    icon: 'fas fa-landmark',
    color: '#1a3c31',
    time: '2 min',
    level: 'Beginner',
    popular: false,
    category: 'Fixed Income & Deposits',
    description: 'Calculate PPF maturity with tax-free compounding over 15 years.',
    about: 'The Public Provident Fund (PPF) is India\'s best tax-saving investment — contributions get 80C deduction, interest is tax-free, and maturity is tax-free. A genuine triple tax exemption.',
    example: 'Investing ₹1.5L/year in PPF at 7.1% for 15 years gives a maturity value of ₹40.68 Lakhs — completely tax-free in your hands.',
    steps: [
      { title: 'Annual Deposit', body: 'PPF accepts up to ₹1.5L per year. Deposits made before 5th of the month earn interest for that full month.' },
      { title: 'Annual Compounding', body: 'PPF compounds annually. The government resets the rate quarterly — we use the current 7.1% as default.' },
      { title: 'Extension Periods', body: 'After 15 years, you can extend in 5-year blocks. We calculate maturity for the initial 15-year period.' }
    ],
    inputs: [
      { id: 'yearlyDeposit', label: 'Yearly Deposit (₹) max ₹1.5L', defaultValue: 150000 },
      { id: 'rate',          label: 'PPF Interest Rate (%)',          defaultValue: 7.1 },
      { id: 'years',         label: 'Tenure (min 15 yrs)',            defaultValue: 15 }
    ],
    outputs: [
      { id: 'displayMaturity',  label: 'Maturity Value (Tax-Free)', color: 'primary' },
      { id: 'displayInvested',  label: 'Total Deposited',           color: 'slate' },
      { id: 'displayInterest',  label: 'Interest Earned',           color: 'green' }
    ],
    primaryOutput: 'displayMaturity',
    chartType: 'bar'
  },

  'nps': {
    slug: 'nps',
    title: 'NPS Calculator',
    icon: 'fas fa-user-shield',
    color: '#7C3AED',
    time: '2 min',
    level: 'Intermediate',
    popular: false,
    category: 'Fixed Income & Deposits',
    description: 'Estimate your NPS corpus and monthly pension at retirement.',
    about: 'The National Pension System (NPS) is a government-backed retirement scheme with market-linked returns. At retirement, 60% is tax-free and 40% must be used to buy an annuity for monthly pension.',
    example: 'Investing ₹5,000/month from age 30 to 60 in NPS at 10% return builds a corpus of ~₹1.13 Crores. 60% (₹68L) is yours tax-free, 40% (₹45L) gives ~₹22,500/month pension.',
    steps: [
      { title: 'Accumulation Phase', body: 'Monthly contributions compounded at the expected NPS equity/debt blend return over your working years.' },
      { title: '60/40 Split at Retirement', body: '60% of the corpus can be withdrawn tax-free at 60. The remaining 40% must buy an annuity.' },
      { title: 'Monthly Pension Estimate', body: 'We estimate the monthly pension from the annuity corpus using a standard annuity rate of 6%.' }
    ],
    inputs: [
      { id: 'monthlyContrib', label: 'Monthly Contribution (₹)', defaultValue: 5000 },
      { id: 'currentAge',     label: 'Current Age',              defaultValue: 30 },
      { id: 'annualReturn',   label: 'Expected Return (%)',       defaultValue: 10 }
    ],
    outputs: [
      { id: 'displayCorpus',   label: 'NPS Corpus at 60',     color: 'primary' },
      { id: 'displayLumpsum',  label: 'Tax-Free Withdrawal',  color: 'green' },
      { id: 'displayPension',  label: 'Est. Monthly Pension', color: 'slate' }
    ],
    primaryOutput: 'displayCorpus',
    chartType: 'doughnut'
  },


  // ─────────────────────────────────────────────────────────────
  // CATEGORY: LOANS & EMI
  // ─────────────────────────────────────────────────────────────

  'emi': {
    slug: 'emi',
    title: 'EMI Calculator',
    icon: 'fas fa-calculator',
    color: '#DC2626',
    time: '1 min',
    level: 'Beginner',
    popular: true,
    category: 'Loans & EMI',
    description: 'Calculate your exact monthly EMI for any loan — home, car, or personal.',
    about: 'The EMI Calculator uses the standard reducing balance formula to tell you exactly how much you\'ll pay every month, and how much of that is interest vs. principal over the life of the loan.',
    example: 'A ₹30L home loan at 9% for 20 years means an EMI of ₹26,992/month. Total amount paid: ₹64.78L — you pay ₹34.78L as interest alone.',
    steps: [
      { title: 'Standard EMI Formula', body: 'EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P = principal, r = monthly rate, n = number of months.' },
      { title: 'Amortisation Schedule', body: 'Every month the EMI is split between principal and interest. Interest reduces as outstanding principal reduces.' },
      { title: 'Total Interest Cost', body: 'Total amount paid minus the loan amount gives the total interest cost — often a shocking number that motivates prepayment.' }
    ],
    inputs: [
      { id: 'loanAmount',  label: 'Loan Amount (₹)',        defaultValue: 3000000 },
      { id: 'rate',        label: 'Interest Rate (% p.a.)', defaultValue: 9 },
      { id: 'tenure',      label: 'Tenure (Years)',          defaultValue: 20 }
    ],
    outputs: [
      { id: 'displayEMI',       label: 'Monthly EMI',      color: 'primary' },
      { id: 'displayInterest',  label: 'Total Interest',   color: 'slate' },
      { id: 'displayTotal',     label: 'Total Amount Paid', color: 'green' }
    ],
    primaryOutput: 'displayEMI',
    chartType: 'doughnut'
  },

  'home-loan': {
    slug: 'home-loan',
    title: 'Home Loan Calculator',
    icon: 'fas fa-house',
    color: '#0891B2',
    time: '2 min',
    level: 'Intermediate',
    popular: false,
    category: 'Loans & EMI',
    description: 'Calculate home loan EMI, total interest, and see a full amortisation schedule.',
    about: 'Beyond just the EMI, the Home Loan Calculator shows you year-by-year amortisation — how much principal you\'ve repaid and how much interest you\'ve paid at any point in time.',
    example: 'A ₹50L home loan at 8.5% for 25 years: EMI is ₹40,260. You pay ₹70.78L in interest — almost 1.4× the original loan amount.',
    steps: [
      { title: 'EMI Calculation', body: 'Using the standard reducing balance formula to compute your monthly payment.' },
      { title: 'Year-by-Year Breakdown', body: 'We build the full amortisation table showing principal and interest components for each year.' },
      { title: 'Prepayment Impact', body: 'The chart helps you visualise how extra payments reduce your outstanding principal and total interest dramatically.' }
    ],
    inputs: [
      { id: 'loanAmount',  label: 'Loan Amount (₹)',   defaultValue: 5000000 },
      { id: 'rate',        label: 'Interest Rate (%)', defaultValue: 8.5 },
      { id: 'tenure',      label: 'Tenure (Years)',    defaultValue: 25 }
    ],
    outputs: [
      { id: 'displayEMI',      label: 'Monthly EMI',      color: 'primary' },
      { id: 'displayInterest', label: 'Total Interest',   color: 'slate' },
      { id: 'displayTotal',    label: 'Total Cost',       color: 'green' }
    ],
    primaryOutput: 'displayEMI',
    chartType: 'bar'
  },

  'prepayment': {
    slug: 'prepayment',
    title: 'Loan Prepayment Calculator',
    icon: 'fas fa-hand-holding-dollar',
    color: '#059669',
    time: '2 min',
    level: 'Intermediate',
    popular: false,
    category: 'Loans & EMI',
    description: 'See how much interest you save and years you cut by making a one-time prepayment.',
    about: 'Making even a small prepayment early in your loan term can save lakhs in interest. This calculator shows the exact savings from a one-time prepayment at any point in your loan.',
    example: 'Making a ₹3L prepayment in year 5 of a 20-year home loan at 9% can save ₹7L+ in interest and cut your tenure by 2-3 years.',
    steps: [
      { title: 'Current Loan Position', body: 'We calculate your outstanding principal at the time of prepayment using the amortisation schedule.' },
      { title: 'Reduced Balance', body: 'The prepayment amount is deducted from the outstanding principal, reducing the base on which future interest is calculated.' },
      { title: 'Interest Saved', body: 'We compare total interest with and without the prepayment to show exact savings and years saved.' }
    ],
    inputs: [
      { id: 'loanAmount',    label: 'Original Loan (₹)',      defaultValue: 3000000 },
      { id: 'rate',          label: 'Interest Rate (%)',       defaultValue: 9 },
      { id: 'tenure',        label: 'Original Tenure (Years)', defaultValue: 20 },
      { id: 'prepayment',    label: 'Prepayment Amount (₹)',   defaultValue: 300000 },
      { id: 'prepayYear',    label: 'Prepayment at Year #',    defaultValue: 5 }
    ],
    outputs: [
      { id: 'displaySaved',  label: 'Interest Saved',    color: 'primary' },
      { id: 'displayYears',  label: 'Years Saved',       color: 'green' },
      { id: 'displayNewEMI', label: 'New Tenure',        color: 'slate' }
    ],
    primaryOutput: 'displaySaved',
    chartType: 'bar'
  },


  // ─────────────────────────────────────────────────────────────
  // CATEGORY: TAX & RETURNS
  // ─────────────────────────────────────────────────────────────

  'tax-saving': {
    slug: 'tax-saving',
    title: 'Tax Saving Calculator',
    icon: 'fas fa-file-invoice',
    color: '#1a3c31',
    time: '2 min',
    level: 'Beginner',
    popular: false,
    category: 'Tax & Returns',
    description: 'Find how much tax you save by investing in 80C, NPS, and health insurance.',
    about: 'India offers substantial tax deductions under Section 80C (₹1.5L), 80CCD(1B) for NPS (₹50K extra), and 80D for health insurance. This calculator shows your tax saved for the Old Tax Regime.',
    example: 'Income ₹12L, tax slab 30%: Investing ₹1.5L in ELSS + ₹50K in NPS + ₹25K in health insurance saves ₹66,750 in tax.',
    steps: [
      { title: 'Gross Income & Slabs', body: 'We apply Old Tax Regime slabs to your gross income to find your baseline tax liability.' },
      { title: 'Deductions Applied', body: 'We subtract all deductions (80C, 80CCD, 80D, HRA, standard deduction) from taxable income.' },
      { title: 'Tax Saved', body: 'The difference between baseline tax and post-deduction tax is your annual tax saving.' }
    ],
    inputs: [
      { id: 'annualIncome',   label: 'Annual Income (₹)',          defaultValue: 1200000 },
      { id: 'section80c',     label: '80C Investments (₹ max 1.5L)', defaultValue: 150000 },
      { id: 'nps80ccd',       label: 'NPS 80CCD(1B) (₹ max 50K)',  defaultValue: 50000 },
      { id: 'healthInsurance', label: 'Health Insurance 80D (₹)',   defaultValue: 25000 }
    ],
    outputs: [
      { id: 'displayTaxSaved',    label: 'Tax Saved',           color: 'primary' },
      { id: 'displayTaxBefore',   label: 'Tax Without Planning', color: 'slate' },
      { id: 'displayTaxAfter',    label: 'Tax With Planning',    color: 'green' }
    ],
    primaryOutput: 'displayTaxSaved',
    chartType: 'doughnut'
  },

  'capital-gains': {
    slug: 'capital-gains',
    title: 'Capital Gains Tax',
    icon: 'fas fa-receipt',
    color: '#B45309',
    time: '2 min',
    level: 'Intermediate',
    popular: false,
    category: 'Tax & Returns',
    description: 'Calculate STCG and LTCG tax on mutual fund and equity sales.',
    about: 'Mutual funds and equity investments are taxed differently based on the holding period. Equity held >1 year is LTCG (taxed at 12.5% above ₹1.25L), while <1 year is STCG (taxed at 20%).',
    example: 'Selling equity MF for ₹5L profit after 2 years: LTCG is ₹5L - ₹1.25L exemption = ₹3.75L × 12.5% = ₹46,875 tax. vs FD interest at 30% slab.',
    steps: [
      { title: 'Classify the Gain', body: 'Determine if the holding period is >12 months (LTCG) or <12 months (STCG) for equity/equity MFs.' },
      { title: 'Apply Exemption', body: 'LTCG has a ₹1.25L annual exemption. We subtract this before applying the 12.5% tax rate.' },
      { title: 'Net Tax Payable', body: 'The final tax is shown alongside the effective tax rate on your total profit, for comparison.' }
    ],
    inputs: [
      { id: 'purchaseValue', label: 'Purchase Value (₹)',    defaultValue: 200000 },
      { id: 'saleValue',     label: 'Sale Value (₹)',        defaultValue: 500000 },
      { id: 'holdingYears',  label: 'Holding Period (Years)', defaultValue: 2 }
    ],
    outputs: [
      { id: 'displayProfit', label: 'Total Profit',   color: 'primary' },
      { id: 'displayTax',    label: 'Tax Payable',    color: 'slate' },
      { id: 'displayNet',    label: 'Net in Hand',    color: 'green' }
    ],
    primaryOutput: 'displayNet',
    chartType: 'doughnut'
  },

  'inflation': {
    slug: 'inflation',
    title: 'Inflation Calculator',
    icon: 'fas fa-arrow-trend-up',
    color: '#DC2626',
    time: '1 min',
    level: 'Beginner',
    popular: false,
    category: 'Tax & Returns',
    description: 'Find the future cost of something today after years of inflation.',
    about: 'Inflation silently erodes your purchasing power. ₹1 Lakh today will feel like far less in 20 years. This calculator shows you exactly how much more you\'ll need in the future to afford the same things.',
    example: 'Monthly expenses of ₹50,000 today at 6% inflation will require ₹1,60,357/month in 20 years — more than 3× as much.',
    steps: [
      { title: 'Current Value', body: 'Enter the current cost of whatever you want to plan for — monthly expenses, a car, a vacation, school fees.' },
      { title: 'Future Value Formula', body: 'Future Value = Present Value × (1 + inflation rate)^years. We compound inflation annually.' },
      { title: 'Purchasing Power Loss', body: 'We show both the future cost and the reverse — what today\'s ₹1 Lakh will be worth in purchasing power terms.' }
    ],
    inputs: [
      { id: 'currentValue',   label: 'Current Amount (₹)',   defaultValue: 100000 },
      { id: 'inflationRate',  label: 'Inflation Rate (%)',    defaultValue: 6 },
      { id: 'years',          label: 'Years',                 defaultValue: 20 }
    ],
    outputs: [
      { id: 'displayFuture',  label: 'Future Cost',          color: 'primary' },
      { id: 'displayLoss',    label: 'Purchasing Power Loss', color: 'slate' },
      { id: 'displayReal',    label: 'Real Value of ₹1L',    color: 'green' }
    ],
    primaryOutput: 'displayFuture',
    chartType: 'line'
  },

  'real-return': {
    slug: 'real-return',
    title: 'Real Return Calculator',
    icon: 'fas fa-magnifying-glass-chart',
    color: '#0891B2',
    time: '1 min',
    level: 'Intermediate',
    popular: false,
    category: 'Tax & Returns',
    description: 'Find your actual inflation-adjusted return after tax on any investment.',
    about: 'A 7% FD at 30% tax rate gives you 4.9% post-tax. After 6% inflation, your real return is actually -1.1%. This calculator exposes the truth about "safe" investments.',
    example: 'FD at 7.5%, income tax at 30%: post-tax return = 5.25%. Inflation at 6%. Real return = (1.0525/1.06) - 1 = -0.7%. You are losing money in real terms.',
    steps: [
      { title: 'Post-Tax Return', body: 'Nominal return minus the tax rate applied to returns gives your actual take-home rate.' },
      { title: 'Fisher Equation', body: 'Real Return = (1 + Post-Tax Return) / (1 + Inflation Rate) - 1. This is the internationally accepted formula.' },
      { title: 'Interpret the Sign', body: 'A positive real return means you\'re genuinely building wealth. A negative one means inflation is eating your savings.' }
    ],
    inputs: [
      { id: 'nominalReturn',  label: 'Nominal Return (%)',   defaultValue: 7.5 },
      { id: 'taxRate',        label: 'Your Tax Rate (%)',    defaultValue: 30 },
      { id: 'inflationRate',  label: 'Inflation Rate (%)',   defaultValue: 6 }
    ],
    outputs: [
      { id: 'displayPostTax', label: 'Post-Tax Return',  color: 'primary' },
      { id: 'displayReal',    label: 'Real Return',       color: 'green' },
      { id: 'displayVerdict', label: 'Verdict',           color: 'slate' }
    ],
    primaryOutput: 'displayReal',
    chartType: 'bar'
  },


  // ─────────────────────────────────────────────────────────────
  // CATEGORY: EDUCATION & LIFE GOALS
  // ─────────────────────────────────────────────────────────────

  'education': {
    slug: 'education',
    title: 'Education Fund Planner',
    icon: 'fas fa-graduation-cap',
    color: '#7C3AED',
    time: '2 min',
    level: 'Beginner',
    popular: false,
    category: 'Education & Life Goals',
    description: 'Plan a monthly SIP to fund your child\'s college education, adjusted for education inflation.',
    about: 'Education costs in India are rising at 10-12% per year — far faster than general inflation. This calculator factors in education inflation to find exactly how much you need to invest monthly.',
    example: 'College costing ₹15L today, child starting in 10 years: at 10% education inflation, you\'ll need ₹38.9L. Monthly SIP at 12% return: ₹17,200/month.',
    steps: [
      { title: 'Inflate the Cost', body: 'We take today\'s education cost and grow it at the education inflation rate for the years until your child starts college.' },
      { title: 'Required SIP', body: 'Using the inflated future cost as the target, we calculate the monthly investment needed at your expected return.' },
      { title: 'Start Now', body: 'Every year you delay significantly increases the required monthly amount — the chart shows the penalty of waiting.' }
    ],
    inputs: [
      { id: 'currentCost',      label: 'Today\'s Education Cost (₹)', defaultValue: 1500000 },
      { id: 'yearsToCollege',   label: 'Years Until College',          defaultValue: 10 },
      { id: 'educationInflation', label: 'Education Inflation (%)',    defaultValue: 10 },
      { id: 'investReturn',     label: 'Investment Return (%)',        defaultValue: 12 }
    ],
    outputs: [
      { id: 'displayFutureCost', label: 'Future Education Cost', color: 'primary' },
      { id: 'displayMonthlySIP', label: 'Required Monthly SIP',  color: 'green' },
      { id: 'displayTotalInvest', label: 'Total Investment',     color: 'slate' }
    ],
    primaryOutput: 'displayMonthlySIP',
    chartType: 'line'
  },

  'marriage': {
    slug: 'marriage',
    title: 'Marriage Fund Planner',
    icon: 'fas fa-heart',
    color: '#E11D48',
    time: '2 min',
    level: 'Beginner',
    popular: false,
    category: 'Education & Life Goals',
    description: 'Plan a monthly SIP to fund a wedding corpus, adjusted for lifestyle inflation.',
    about: 'Wedding costs in India are rising at 8-12% annually. Planning early with a dedicated SIP ensures you celebrate without debt — this calculator helps you figure out the exact monthly amount.',
    example: 'A wedding budgeted at ₹20L today, 8 years from now at 10% inflation becomes ₹42.87L. Monthly SIP at 12% return: ₹26,500/month.',
    steps: [
      { title: 'Inflate the Budget', body: 'Today\'s wedding budget is grown at lifestyle inflation to find the real future cost.' },
      { title: 'Monthly SIP Required', body: 'Using the future cost as the target, we apply the SIP formula to find the required monthly investment.' },
      { title: 'Timeline Sensitivity', body: 'The chart shows how the required monthly amount rises sharply as the wedding date approaches — start early.' }
    ],
    inputs: [
      { id: 'currentBudget',  label: 'Today\'s Wedding Budget (₹)', defaultValue: 2000000 },
      { id: 'yearsAway',      label: 'Years Until Wedding',          defaultValue: 8 },
      { id: 'lifestyle_inf',  label: 'Lifestyle Inflation (%)',       defaultValue: 10 },
      { id: 'investReturn',   label: 'Investment Return (%)',         defaultValue: 12 }
    ],
    outputs: [
      { id: 'displayFutureCost', label: 'Future Wedding Cost', color: 'primary' },
      { id: 'displayMonthlySIP', label: 'Required Monthly SIP', color: 'green' },
      { id: 'displayTotalInvest', label: 'Total Investment',    color: 'slate' }
    ],
    primaryOutput: 'displayMonthlySIP',
    chartType: 'line'
  },

  'emergency-fund': {
    slug: 'emergency-fund',
    title: 'Emergency Fund Calculator',
    icon: 'fas fa-kit-medical',
    color: '#DC2626',
    time: '1 min',
    level: 'Beginner',
    popular: false,
    category: 'Education & Life Goals',
    description: 'Find out exactly how large your emergency fund should be based on your expenses.',
    about: 'An emergency fund is your financial safety net — typically 6 months of essential expenses kept in a liquid fund or savings account. This calculator helps you size it correctly.',
    example: 'Monthly essential expenses of ₹40,000: recommended emergency fund = ₹2,40,000. If you have ₹80K saved, you need ₹1,60,000 more in a liquid fund.',
    steps: [
      { title: 'Identify Essential Expenses', body: 'Only essential monthly expenses count: rent/EMI, food, utilities, insurance premiums, minimum debt payments.' },
      { title: '3-6 Months Buffer', body: 'We recommend 3 months for two-income households, 6 months for single-income or variable income earners.' },
      { title: 'Shortfall Calculation', body: 'We subtract your existing liquid savings to find exactly how much more you need and suggest a monthly saving amount.' }
    ],
    inputs: [
      { id: 'monthlyExpenses', label: 'Monthly Essential Expenses (₹)', defaultValue: 40000 },
      { id: 'currentSavings',  label: 'Current Liquid Savings (₹)',     defaultValue: 80000 },
      { id: 'monthsCover',     label: 'Months of Cover (3-12)',          defaultValue: 6 }
    ],
    outputs: [
      { id: 'displayTarget',    label: 'Emergency Fund Target',  color: 'primary' },
      { id: 'displayShortfall', label: 'Shortfall',              color: 'slate' },
      { id: 'displayMonthly',   label: 'Save / Month to Fill',   color: 'green' }
    ],
    primaryOutput: 'displayTarget',
    chartType: 'doughnut'
  },

  'house-purchase': {
    slug: 'house-purchase',
    title: 'House Affordability',
    icon: 'fas fa-house-chimney',
    color: '#1a3c31',
    time: '3 min',
    level: 'Intermediate',
    popular: false,
    category: 'Education & Life Goals',
    description: 'Find out what home price you can afford and how long to save for a down payment.',
    about: 'Buying a house is India\'s biggest financial decision. This calculator tells you the maximum home price you can afford based on your income, the down payment SIP needed, and your EMI capacity.',
    example: 'Monthly income ₹1L, savings ₹5L: you can afford a ₹60L home (20% down payment = ₹12L). SIP of ₹18,500/month for 3 years builds the ₹12L down payment at 12% return.',
    steps: [
      { title: 'Affordability Rule', body: 'Recommended max home value = 4-5× annual income. EMI should not exceed 40% of net monthly income.' },
      { title: 'Down Payment SIP', body: 'We calculate the monthly SIP needed to accumulate the 20% down payment by your target purchase date.' },
      { title: 'Ongoing EMI', body: 'The remaining 80% as a home loan at current rates gives your expected monthly EMI post-purchase.' }
    ],
    inputs: [
      { id: 'monthlyIncome',   label: 'Monthly Net Income (₹)',     defaultValue: 100000 },
      { id: 'targetHome',      label: 'Target Home Price (₹)',       defaultValue: 6000000 },
      { id: 'yearsToSave',     label: 'Years to Save Down Payment',  defaultValue: 3 },
      { id: 'investReturn',    label: 'Investment Return (%)',        defaultValue: 12 }
    ],
    outputs: [
      { id: 'displayDownPay',  label: 'Down Payment Needed',   color: 'primary' },
      { id: 'displaySIP',      label: 'Monthly SIP for DP',    color: 'green' },
      { id: 'displayEMI',      label: 'Home Loan EMI After',   color: 'slate' }
    ],
    primaryOutput: 'displayDownPay',
    chartType: 'doughnut'
  },


  // ─────────────────────────────────────────────────────────────
  // CATEGORY: PORTFOLIO & ANALYSIS
  // ─────────────────────────────────────────────────────────────

  'compounding': {
    slug: 'compounding',
    title: 'Power of Compounding',
    icon: 'fas fa-infinity',
    color: '#059669',
    time: '1 min',
    level: 'Beginner',
    popular: false,
    category: 'Portfolio & Analysis',
    description: 'Visualise how compound interest grows any amount over time — the 8th wonder of the world.',
    about: 'Einstein reportedly called compounding the eighth wonder of the world. This simple calculator lets you visualise just how powerful time and return rate are when combined.',
    example: '₹1 Lakh at 15% for 30 years becomes ₹66.2 Lakhs — without adding a single rupee. At 12% it\'s ₹29.96L. The 3% difference makes a 2× impact over 30 years.',
    steps: [
      { title: 'Principal', body: 'Enter your starting amount — this is the seed that compounding will grow.' },
      { title: 'Annual Return', body: 'Even a 1-2% difference in annual return creates dramatically different outcomes over decades.' },
      { title: 'Time Horizon', body: 'Compounding is non-linear — the last few years of a long investment produce more wealth than the first decade combined.' }
    ],
    inputs: [
      { id: 'principal',    label: 'Starting Amount (₹)', defaultValue: 100000 },
      { id: 'annualReturn', label: 'Annual Return (%)',    defaultValue: 12 },
      { id: 'years',        label: 'Years',               defaultValue: 30 }
    ],
    outputs: [
      { id: 'displayFinal',  label: 'Final Value',      color: 'primary' },
      { id: 'displayGain',   label: 'Total Gain',       color: 'green' },
      { id: 'displayGrowth', label: 'Total Growth (%)', color: 'slate' }
    ],
    primaryOutput: 'displayFinal',
    chartType: 'line'
  },

  'rule-of-72': {
    slug: 'rule-of-72',
    title: 'Rule of 72',
    icon: 'fas fa-clock-rotate-left',
    color: '#7C3AED',
    time: '1 min',
    level: 'Beginner',
    popular: false,
    category: 'Portfolio & Analysis',
    description: 'Find out how many years it takes to double your money at any interest rate.',
    about: 'The Rule of 72 is a simple mental math trick: divide 72 by your annual return rate to get the approximate number of years to double your money. A ₹1L investment at 12% doubles in ~6 years.',
    example: 'At 8% (FD): doubles in 9 years. At 12% (equity MF): doubles in 6 years. At 15% (small cap): doubles in 4.8 years. Over 30 years, these differences are enormous.',
    steps: [
      { title: 'Rule of 72', body: 'Years to double = 72 / annual return rate. This is an approximation; we also show the exact value using logarithms.' },
      { title: 'Doublings Over Time', body: 'We show how many times your money doubles over your chosen period at the given rate.' },
      { title: 'Comparison Table', body: 'We compare FD (7.5%), PPF (7.1%), equity MF (12%), and your chosen rate side-by-side.' }
    ],
    inputs: [
      { id: 'annualReturn', label: 'Annual Return (%)', defaultValue: 12 },
      { id: 'years',        label: 'Investment Period', defaultValue: 30 },
      { id: 'principal',    label: 'Starting Amount (₹)', defaultValue: 100000 }
    ],
    outputs: [
      { id: 'displayYearsDouble', label: 'Years to Double', color: 'primary' },
      { id: 'displayDoublings',   label: 'Times Doubled',   color: 'green' },
      { id: 'displayFinal',       label: 'Final Value',     color: 'slate' }
    ],
    primaryOutput: 'displayYearsDouble',
    chartType: 'bar'
  },

  'delay-cost': {
    slug: 'delay-cost',
    title: 'Cost of Delay Calculator',
    icon: 'fas fa-hourglass-half',
    color: '#DC2626',
    time: '2 min',
    level: 'Beginner',
    popular: false,
    category: 'Portfolio & Analysis',
    description: 'See exactly how much wealth you lose by starting your SIP 1, 3, or 5 years later.',
    about: 'Procrastination is the most expensive investment mistake. This calculator quantifies exactly how much a delay costs — the answer is almost always shocking and motivating.',
    example: 'Starting a ₹10,000/month SIP at 25 instead of 30 at 12% return: difference in corpus at 60 is over ₹1.2 Crores. Delay costs ₹1.2 Crores for just 5 years.',
    steps: [
      { title: 'Start Today', body: 'We calculate the SIP corpus if you start immediately from your current age to retirement.' },
      { title: 'Delayed Start', body: 'We run the same SIP starting X years from now, with correspondingly fewer years to grow.' },
      { title: 'Wealth Lost', body: 'The difference is the true cost of delay — often multiple crores for even a 3-5 year delay.' }
    ],
    inputs: [
      { id: 'monthlyAmount', label: 'Monthly SIP (₹)',      defaultValue: 10000 },
      { id: 'currentAge',    label: 'Current Age',          defaultValue: 25 },
      { id: 'retireAge',     label: 'Retirement Age',       defaultValue: 60 },
      { id: 'delayYears',    label: 'Delay (Years)',        defaultValue: 5 },
      { id: 'annualReturn',  label: 'Expected Return (%)',  defaultValue: 12 }
    ],
    outputs: [
      { id: 'displayNow',   label: 'Start Now Corpus',    color: 'primary' },
      { id: 'displayLater', label: 'Delayed Corpus',      color: 'slate' },
      { id: 'displayLost',  label: 'Wealth Lost',         color: 'green' }
    ],
    primaryOutput: 'displayLost',
    chartType: 'bar'
  },

  'expense-ratio': {
    slug: 'expense-ratio',
    title: 'Expense Ratio Impact',
    icon: 'fas fa-money-bill-trend-up',
    color: '#B45309',
    time: '2 min',
    level: 'Intermediate',
    popular: false,
    category: 'Portfolio & Analysis',
    description: 'See how much a 1% difference in expense ratio costs you over 20 years.',
    about: 'A 1% higher expense ratio (like choosing Regular over Direct plan) sounds small but compounds into lakhs over decades. This calculator makes the cost of high expense ratios unmistakably clear.',
    example: '₹10,000/month SIP for 20 years: Direct fund (0.3% ER) vs Regular fund (1.3% ER). Difference at 12% gross return: the Direct plan gives ₹19.3L more — for the same investment!',
    steps: [
      { title: 'Gross Return vs Net Return', body: 'Net return = Gross return − Expense Ratio. A fund returning 12% with 1% ER gives you effectively 11%.' },
      { title: 'Run Parallel SIPs', body: 'We calculate the same SIP under both expense ratios and chart both growth curves.' },
      { title: 'Total Cost of Regular Plan', body: 'The difference between the two corpus values at the end is the total cost you paid for the Regular plan.' }
    ],
    inputs: [
      { id: 'monthlyAmount',  label: 'Monthly SIP (₹)',         defaultValue: 10000 },
      { id: 'years',          label: 'Duration (Years)',         defaultValue: 20 },
      { id: 'grossReturn',    label: 'Gross Fund Return (%)',    defaultValue: 12 },
      { id: 'lowER',          label: 'Direct Plan ER (%)',       defaultValue: 0.3 },
      { id: 'highER',         label: 'Regular Plan ER (%)',      defaultValue: 1.3 }
    ],
    outputs: [
      { id: 'displayDirect',   label: 'Direct Plan Value',   color: 'primary' },
      { id: 'displayRegular',  label: 'Regular Plan Value',  color: 'slate' },
      { id: 'displayDiff',     label: 'Extra Cost of Regular', color: 'green' }
    ],
    primaryOutput: 'displayDiff',
    chartType: 'line'
  }

};

// ─── Category order for display on the hub page ───
const toolCategories = [
  'SIP & Systematic Investing',
  'Lumpsum & One-Time Investing',
  'Retirement & Life Planning',
  'Fixed Income & Deposits',
  'Loans & EMI',
  'Tax & Returns',
  'Education & Life Goals',
  'Portfolio & Analysis'
];

module.exports = { tools, toolCategories };