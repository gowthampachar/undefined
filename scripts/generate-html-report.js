const { generate } = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const jsonReport = path.join(__dirname, '..', 'reports', 'cucumber.json');

if (!fs.existsSync(jsonReport)) {
  console.error('No cucumber JSON report found at', jsonReport);
  console.error('Run `npm run test:json` or `npm test` with JSON formatter first.');
  process.exit(1);
}

generate({
  jsonDir: path.join(__dirname, '..', 'reports'),
  reportPath: path.join(__dirname, '..', 'reports', 'html'),
  openReportInBrowser: false,
  displayDuration: true,
});

console.log('HTML report generated at reports/html');
