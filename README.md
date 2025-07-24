# Playwright Sample E2E & API Framework

A minimal, modular Playwright framework for end-to-end (E2E) browser automation and API testing. Designed for scalability, maintainability, and ease of use.

---

## 📦 Features
- E2E browser automation with Playwright
- API testing support
- Page Object Model (POM) structure
- Test data generation utilities
- Factory pattern for test data
- Fixtures for test setup
- Parallel test execution
- HTML reporting

---

## 🛠️ Setup
```bash
npm install
```

---

## 🧪 Run Tests
```bash
npx playwright test
```

View the HTML report:
```bash
npx playwright show-report
```

---

## 📁 Project Structure

- `factory/`
  - `UserFactory.ts` — Factory for generating user test data
- `fixtures/`
  - `fixture-pom.ts` — Playwright fixtures for Page Object Model setup
- `playwright.config.ts` — Playwright configuration file
- `pom/` — Page Object Model implementation
  - `BasePage.ts` — Base class for all page objects
  - `PageManager.ts` — Central manager for page objects
  - `pages/`
    - `samplePage.ts` — Example page object
- `tests/` — Test specifications
  - `API/` — API test specs (add your API tests here)
  - `UI/` — UI/E2E test specs
    - `sample.spec.ts` — Example UI test
- `types/`
  - `user.d.ts` — TypeScript type definitions for user data
- `utils/`
  - `generators/`
    - `dataGenerator.ts` — Utility for generating random or dynamic test data
- `package.json` — Project dependencies and scripts

---