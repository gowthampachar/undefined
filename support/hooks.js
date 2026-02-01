const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');

function browserByName(name) {
  switch ((name || 'chromium').toLowerCase()) {
    case 'firefox':
      return firefox;
    case 'webkit':
      return webkit;
    case 'chromium':
    default:
      return chromium;
  }
}

Before(async function () {
  // increase default timeout for setup (browser launch etc.)
  setDefaultTimeout(60000);
  const headlessEnv = process.env.HEADLESS;
  const headless = headlessEnv === undefined ? true : headlessEnv.toLowerCase() !== 'false';
  const browserName = process.env.BROWSER || 'chromium';
  const browserType = browserByName(browserName);

  this.browser = await browserType.launch({ headless });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
