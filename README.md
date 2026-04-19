# Playwright Sauce Demo

This repository contains an automated testing suite for [Saucedemo](https://www.saucedemo.com/) built using **Playwright** and **TypeScript**. 

## Framework Architecture

The framework is built around standard Playwright best-practices for scalability, readability, and reliability:

- **Page Object Model (POM)**: Test interactions and element locators are fully encapsulated inside their respective page models within the `pages/` directory:
  - `LoginPage.ts`: Authentication flows and login errors.
  - `InventoryPage.ts`: Product lists, sorting logic, and cart additions.
  - `CartPage.ts`: Cart contents and checkout transitions.
  - `CheckoutPage.ts`: Address forms and order finalization.
- **Web-First Assertions**: All tests cleanly separate state checks and interaction logic natively resolving flakiness through Playwright's `expect` auto-retry mechanics implemented inside the specs.
- **baseURL configuration**: URLs are securely decoupled locally allowing execution via relative test paths.

## Prerequisites

- [Node.js](https://nodejs.org/) (Version 16 or higher is recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

## Installation

1. Clone the repository and navigate into the project directory.
2. Install the node modules:
   ```bash
   npm install
   ```
3. Install the required Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running the Tests

To run the automated tests in a headless environment, execute:

```bash
npx playwright test
```

To run the tests with the Playwright UI (useful for debugging and visual tracing):

```bash
npx playwright test --ui
```

### Viewing Test Reports

Playwright automatically generates a detailed HTML report summarizing the execution along with traces and failures. To manually review the most recent run:

```bash
npx playwright show-report
```
