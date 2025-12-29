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
