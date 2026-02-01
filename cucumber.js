/**
 * Cucumber.js profiles
 * - `default`: quick run (progress formatter)
 * - `reports`: produces a JSON report at `reports/cucumber.json` (used by HTML/Allure generators)
 */
module.exports = {
  default: '--require ./support/**/*.js '
    + '--require ./steps/**/*.js '
    + '--format progress '
    + '--publish-quiet ./features/**/*.feature',

  reports: '--require ./support/**/*.js '
    + '--require ./steps/**/*.js '
    + '--format progress '
    + '--format json:./reports/cucumber.json '
    + './features/**/*.feature'
};
