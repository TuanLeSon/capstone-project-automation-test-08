# 🎬 Capstone Project — Automation Testing Framework

> Playwright + TypeScript End-to-End Automation Framework  
> Built for https://demo1.cybersoft.edu.vn/ (Cinema ticketing app)

## 🚀 Overview

This project is a **modular, maintainable, reusable automation framework** built with Playwright & TypeScript following Page Object Model (POM).  
It supports:

- UI validation tests
- Business flow tests
- Hybrid API + UI verification
- CI/CD integration (GitHub Actions)
- Multi-environment configuration
- HTML report, video, trace on failure

---

## 📁 Key Features

✔ Page Object Model (POM)  
✔ Component-based design  
✔ Fixture for login (optional, per-test)  
✔ Random utilities + data generation  
✔ HTML & video reporting  
✔ GitHub Actions CI/CD integration

---

📦capstone-project-automation-test-08
├── 📁src
│ ├── 📁pages
│ │ ├── auth/
│ │ │ ├── LoginPage.ts
│ │ │ └── SignupPage.ts
│ │ ├── home/
│ │ │ └── HomePage.ts
│ │ ├── account/
│ │ │ └── AccountPage.ts
│ │ ├── booking/
│ │ │ └── SeatPlanPage.ts
│ │ └── common/
│ │ ├── CommonPage.ts
│ │ └── WarningDialog.ts
│ │
│ ├── 📁fixtures
│ │ └── auth.fixture.ts
│ │
│ ├── 📁utils
│ │ ├── generator.ts
│ │ └── wait.ts
│ │
│ ├── 📁helpers
│ │ └── authHelper.ts
│ │
│ └── 📁config
│ ├── env.dev.ts
│ └── env.prod.ts
│
├── 📁tests
│ ├── auth/
│ ├── home/
│ ├── account/
│ ├── booking/
│ └── ui/
│
├── configs/
│ └── playwright.config.ts
├── .github/
│ └── workflows/playwright-ci.yml
├── package.json
└── README.md
## 📦 Prerequisites

✔ Node.js >= 16.14  
✔ npm or Yarn  
✔ Git  

Clone repo:

```bash
git clone https://github.com/TuanLeSon/capstone-project-automation-test-08.git
cd capstone-project-automation-test-08
npm install
🧪 Running Tests
🧹 Install Playwright Browsers
bash
Copy code
npx playwright install --with-deps
🔹 Run All Tests
bash
Copy code
npx playwright test
🔹 Run Specific Test Suite
bash
Copy code
# UI tests
npx playwright test tests/ui

# Account tests
npx playwright test tests/account

# Booking Business flow
npx playwright test tests/booking
🔹 Run with HTML Report
bash
Copy code
npx playwright test --reporter=html
Generate and open report:

bash
Copy code
npx playwright show-report
🔧 Environment Config
Use multi-environment config:

src/config/env.dev.ts

ts
Copy code
export default {
  BASE_URL: 'https://demo1.cybersoft.edu.vn',
  STANDARD_USER: '...',
  STANDARD_PASS: '...',
};
Load environment via config:

bash
Copy code
npx playwright test --config=configs/env.dev.ts
🧠 Fixtures
Login Fixture
File: src/fixtures/auth.fixture.ts

ts
Copy code
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/auth/LoginPage';
import env from '../config/env.dev';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await page.goto(`${env.BASE_URL}/login`);
    await login.email.fill(env.STANDARD_USER);
    await login.password.fill(env.STANDARD_PASS);
    await login.login.click();
    await use(page);
  },
});

export { expect } from '@playwright/test';
Use in tests:

ts
Copy code
import { test, expect } from '../../src/fixtures/auth.fixture';

test('Update profile', async ({ authenticatedPage }) => {
  …  
});
📈 CI/CD with GitHub Actions
Workflow at:

bash
Copy code
.github/workflows/playwright-ci.yml
Example trigger:

yaml
Copy code
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
Report artifact is uploaded on every run for all browsers via matrix.

🧪 Best Practices
✔ Keep tests idempotent
✔ Use meaningful test data
✔ Retry flaky tests with Playwright retries: 2 in config
✔ Use fixtures for shared setup
✔ Avoid hardcoded waits — prefer Playwright auto-wait

🧾 Example Tests
Login validation
ts
Copy code
import { test, expect } from '@playwright/test';

test('Empty login shows validation', async ({ page }) => {
  await page.goto('/login');
  …
});
🛠 Utilities
Random Data Generator
Available at:

ts
Copy code
src/utils/generator.ts
Use for test data e.g., random email, password.

❗ Notes
✔ Some flows like redirect after booking may be known bugs in AUT — tests may catch them intentionally.
✔ Adjust selectors in Page Objects if UI changes.
