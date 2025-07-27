<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height="40" alt="docker logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" height="40" alt="eslint logo"  />
</div>

###

# Playwright E2E & API Framework

A minimal, modular Playwright framework for end-to-end (E2E) browser automation and API testing. Designed for scalability, maintainability, and ease of use.

---

## 📦 Features
- Page Object Model (POM) structure ready to use
- API placeholder and datatypes
- Test data generation utilities
- Factory pattern for test data
- Fixtures for test setup
- HTML, Allure reporting

---

## 🛠️ Setup
```bash
npm install
```

---

## 📌 Run Tests
```bash
npx playwright test
```

View the HTML report:
```bash
npx playwright show-report
```

---

## 📁 Project Structure

- `api/`
  - `placeholder.api.ts` — API endpoint definitions and configurations
- `components/`
  - `AbstractComponent.ts` — Abstract base class for UI components
- `config/`
  - `timeouts.ts` — Centralized timeout configurations
- `data/` — Test data files and datasets
- `factory/`
  - `UserFactory.ts` — Factory for generating user test data
- `fixtures/`
  - `fixture-pom.ts` — Playwright fixtures for Page Object Model setup
- `global.setup.ts` — Global test setup configuration
- `global.teardown.ts` — Global test teardown configuration
- `pom/` — Page Object Model implementation
  - `BasePage.ts` — Base class for all page objects
  - `PageManager.ts` — Central manager for page objects
  - `pages/`
    - `samplePage.ts` — Example page object
- `tests/` — Test specifications
  - `API/` — API test specs
    - `sample.api.ts` — Example API test
  - `UI/` — UI/E2E test specs
    - `sample.spec.ts` — Example UI test
- `types/` — TypeScript type definitions
  - `enums/`
    - `logger.ts` — Logger enumeration types
    - `rest.ts` — REST API enumeration types
  - `types/`
    - `api.d.ts` — API-related type definitions
    - `post.d.ts` — Post-related type definitions
    - `user.d.ts` — User data type definitions
- `utils/` — Utility functions and helpers
  - `api/`
    - `api.helpers.ts` — API testing helper functions
  - `generators/`
    - `dataGenerator.ts` — Utility for generating random or dynamic test data
  - `logger/`
    - `logger.ts` — Logging utility functions
  - `runner/`
    - `sharedPage.ts` — Shared page state management utilities
- `playwright.config.ts` — Playwright configuration file
- `tsconfig.json` — TypeScript configuration
- `package.json` — Project dependencies and scripts

---

## 📑 Examples

### POM fixture usage
Page Object Model (POM) fixture is being create in order to reduce amount of code duplications and let engineer to reuse pages from one single instance of calling fixture in the test execution


```javascript
import { test } from '../../fixtures/fixture-pom';

test('Simple test', async ({ pm }) => {
  await pm.samplePage.goto()
});
```

### Shared page state between executions
Shared page stage design is designed to let engineer create single-runner suites with one shared context, since in Playwright each test with default page fixture will create new separate isolated context

```javascript
let page: Page;

test.beforeAll(async ({ browser }) => {
  await setupSharedPage(browser, 'URL');
  page = getSharedPage();
});

test.afterAll(async () => {
  await teardownSharedPage();
});

test.describe('Shared page suite', () => {
  test('Test 1', async () => {
    // Actions
  });
  test('Test 2', async () => {
    // Actions
  });
});
```