# Playwright + Cucumber (BDD) JavaScript example

This folder contains a minimal Playwright + Cucumber setup to test the login page at `https://practicetestautomation.com/practice-test-login/`.

Getting started

1. Change to the project folder:

```powershell
cd "<Go to your local path>\playwright-bdd-js>"
```

2. Install dependencies and browsers:

```powershell
npm install
npm run install-browsers
```

 # Playwright + Cucumber (BDD) JavaScript example

 This folder contains a minimal Playwright + Cucumber setup to test the login page at
 `https://practicetestautomation.com/practice-test-login/`.

 ## Prerequisites
 - Node.js 16+ (Node 18/20 recommended)
 - Git (optional)

 ## Quick start (PowerShell)

 1. Change to the project folder:

 ```powershell
 cd "<Go to your local path>\playwright-bdd-js>"
 ```

 2. Install dependencies and Playwright browsers:

 ```powershell
 npm install
 npm run install-browsers
 ```

## Setup (step-by-step)
Follow these exact commands in PowerShell to prepare and run the project locally.

1) Open PowerShell and confirm Node/npm are installed:

```powershell
node --version
npm --version
```

2) Change to the project directory:

```powershell
cd "<Go to your local path>\playwright-bdd-js>"
```

3) Install Node dependencies declared in `package.json`:

```powershell
npm install
```

4) Download and install Playwright browsers (Chromium/Firefox/WebKit):

```powershell
npm run install-browsers
```

5) (Optional) Set environment variables for credential-driven scenarios and choose headed/headless mode. Examples:

```powershell
# headed chromium using env credentials
$env:CRED_INVALID_USERNAME="wronguser"
$env:CRED_INVALID_PASSWORD="wrongpass"
$env:HEADLESS="false"
$env:BROWSER="chromium"

# headless (CI)
$env:HEADLESS="true"
```

6) Run the test suite (this uses the `cucumber.js` config in the project):

```powershell
npm test
```

7) Run a single feature file (useful while developing steps):

```powershell
npx cucumber-js "./features/login.feature" --require "./support/**/*.js" --require "./steps/**/*.js"
```

Notes:
- Use `HEADLESS=false` to see the browser during development.
- Use `BROWSER=firefox` or `BROWSER=webkit` to run tests in other engines.
- If you need to remove browser binaries later, run `npx playwright uninstall`.

 ## Run the tests

 - Run in headed Chromium (you will see the browser window):

 ```powershell
 cd "<Go to your local path>\playwright-bdd-js>"
 $env:HEADLESS="false"; $env:BROWSER="chromium"; npm test
 ```

 - Run headless (CI-friendly):

 ```powershell
 cd "<Go to your local path>\playwright-bdd-js>"
 $env:HEADLESS="true"; npm test
 ```

 - Run with Firefox or WebKit (headed):

 ```powershell
 $env:BROWSER="firefox"; $env:HEADLESS="false"; npm test
 $env:BROWSER="webkit"; $env:HEADLESS="false"; npm test
 ```

 - Run a single feature file directly with Cucumber (no env vars):

 ```powershell
 cd "<Go to your local path>\playwright-bdd-js>"
 npx cucumber-js "./features/login.feature" --require "./support/**/*.js" --require "./steps/**/*.js"
 ```

 ## Environment variables used by the hooks
 - `HEADLESS` — `true` (default) or `false` (set to `false` to open a headed browser)
 - `BROWSER` — `chromium` (default), `firefox`, or `webkit`

## Handling sensitive data (notes)
The scenarios in this repository demonstrate *different ways* of providing credentials to tests. These are examples only — treat all secrets carefully in real projects:

- Environment variables (`env`): credentials are provided at runtime via `CRED_<KEY>_USERNAME` and `CRED_<KEY>_PASSWORD`. This is common for CI and avoids committing secrets to source control.
- JSON file (`json`): credentials are read from `config/credentials.json`. Useful for local development but never commit real secrets — add such files to `.gitignore` or use a separate, private file.
- XML file (`xml`): credentials are read from `config/credentials.xml`. Functionally equivalent to JSON but used here to demonstrate parsing XML.

Security recommendations:
- Never commit real credentials to the repository. Treat the `config/` files here as samples/test data only.
- Prefer environment variables or secret managers (Azure Key Vault, AWS Secrets Manager, HashiCorp Vault) for CI and production tests.
- If you must use files for local development, keep them out of source control and document how developers should obtain them securely.
- Consider using `.env` files with a library like `dotenv` for local development (and add `.env` to `.gitignore`), or use encrypted secrets if required.

These examples show patterns for flexibility; adapt them to your team's security policies before using with real credentials.

 ## Troubleshooting
 - If `npm install` fails, ensure your Node/npm versions are up-to-date and you have network access.
 - If Playwright browsers are missing or fail to install, re-run `npm run install-browsers`.
 - If you see timeouts, increase the timeout in `support/hooks.js` (the project already sets `setDefaultTimeout(60000)`).
 - If steps fail due to selectors, inspect the site and update selectors in `steps/login.steps.js` or `pages/loginPage.js`.

 ## Useful commands (summary)
 ```powershell
 cd "<Go to your local path>\playwright-bdd-js>"
 npm install
 npm run install-browsers
 $env:HEADLESS="false"; $env:BROWSER="chromium"; npm test    # headed chromium
 $env:HEADLESS="true"; npm test                            # headless
 npx cucumber-js "./features/login.feature" --require "./support/**/*.js" --require "./steps/**/*.js"
 ```

 ## Where to look
 - Features: `features/`
 - Steps: `steps/`
 - Hooks: `support/hooks.js`
 - Page objects: `pages/`

## NPM shortcut scripts
You can use the provided npm scripts to run tests quickly:

- `npm run test:headed` — Run tests in headed Chromium (uses `cross-env`).
- `npm run test:headless` — Run tests headless (CI-style).
- `npm run test:firefox` — Run tests in headed Firefox.
- `npm run test:webkit` — Run tests in headed WebKit.
- `npm run ci` — Installs browsers and runs headless tests (used by CI).

Note: these scripts rely on `cross-env` which is added as a dev dependency to ensure environment variables are set cross-platform.

## .env example
A sample `.env.example` file is provided at the project root. For local development you can copy it to `.env` and (optionally) use a library like `dotenv` to load it before running tests.

```
copy .env.example .env
```

If you add a `.env` file, make sure to add it to `.gitignore` so you don't commit secrets.

## CI example (GitHub Actions)
A simple GitHub Actions workflow was added at `.github/workflows/ci.yml`. It checks out the repo, installs Node, installs dependencies and Playwright browsers, then runs the tests in headless mode.

You can customize the workflow to run matrix jobs across browsers or Node versions.

## Reports
This project can produce several report formats:

- Cucumber JSON: run the test suite and produce a JSON report at `reports/cucumber.json`:

```powershell
# run tests and write cucumber JSON
npm run test:json
```

- HTML report: generate an HTML report from the cucumber JSON (uses `multiple-cucumber-html-reporter`):

```powershell
npm run report:html
# output -> reports/html/index.html
```

- Allure report: if your test run produces Allure results in `allure-results`, generate an Allure HTML report with:

```powershell
npm run report:allure
# output -> ./allure-report
```

Note: this scaffold includes the `report:allure` script which runs `allure generate` if `allure-results` exist. The repository does not automatically produce Allure results; to enable Allure reporting you can integrate an Allure adapter (for example `allure-cucumberjs`) or write Allure results in your hooks.
