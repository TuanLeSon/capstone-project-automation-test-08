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

## 🗂 Folder Structure
📦capstone-project-automation-test-08
├── 📁src
│ ├── 📁pages
│ │ ├── auth/
│ │ │ ├── LoginPage.ts
│ │ │ └── SignupPage.ts
│ │ ├── home/
│ │ │ └── HomePage.in`);      await login.email.fill(env.STANDARD_USER);
    await login.password.fill(env.STANDARD_PASS);
    await login.login.click();
    await use(page);
  },
});

export { expect } from '@playwright/test';


Use in tests:

import { test, expect } from '../../src/fixtures/auth.fixture';

test('Update profile', async ({ authenticatedPage }) => {
  …  
});

📈 CI/CD with GitHub Actions

Workflow at:

.github/workflows/playwright-ci.yml


Example trigger:

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
import { test, expect } from '@playwright/test';

test('Empty login shows validation', async ({ page }) => {
  await page.goto('/login');
  …
});

🛠 Utilities
Random Data Generator

Available at:

src/utils/generator.ts


Use for test data e.g., random email, password.

❗ Notes

✔ Some flows like redirect after booking may be known bugs in AUT — tests may catch them intentionally.
✔ Adjust selectors in Page Objects if UI changes.

📌 Contribution

If you want to extend:

Add more modules under tests/

Create new PageObjects in src/pages/

Add API tests under tests/api

❤️ Thank you!



