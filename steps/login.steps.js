const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Given('I am on the login page', async function () {
  await this.page.goto('https://practicetestautomation.com/practice-test-login/');
});

When('I enter username {string} and password {string}', async function (username, password) {
  await this.page.fill('#username', username);
  await this.page.fill('#password', password);
});

When('I click the login button', async function () {
  await this.page.click('#submit');
});

When('I login using credentials from {string} key {string}', async function (source, key) {
  let creds = { username: '', password: '' };
  if (source === 'env') {
    creds.username = process.env[`CRED_${key.toUpperCase()}_USERNAME`];
    creds.password = process.env[`CRED_${key.toUpperCase()}_PASSWORD`];
  } else if (source === 'json') {
    const fs = require('fs');
    const path = require('path');
    const file = path.join(__dirname, '..', 'config', 'credentials.json');
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = JSON.parse(raw);
    creds = parsed[key];
  } else if (source === 'xml') {
    const fs = require('fs');
    const path = require('path');
    const xml2js = require('xml2js');
    const file = path.join(__dirname, '..', 'config', 'credentials.xml');
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = await xml2js.parseStringPromise(raw);
    // parsed.credentials.invalid.username[0]
    creds.username = parsed.credentials[key][0].username[0];
    creds.password = parsed.credentials[key][0].password[0];
  }

  await this.page.fill('#username', creds.username || '');
  await this.page.fill('#password', creds.password || '');
  await this.page.click('#submit');
});

Then('I should see an error message', async function () {
  const visible = await this.page.isVisible('#error');
  expect(visible).to.equal(true);
});
