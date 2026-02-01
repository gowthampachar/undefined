class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = '#username';
    this.password = '#password';
    this.submit = '#submit';
    this.error = '#error';
  }

  async goto() {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }

  async fillCredentials(user, pass) {
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
  }

  async submitLogin() {
    await this.page.click(this.submit);
  }

  async isErrorVisible() {
    return this.page.isVisible(this.error);
  }
}

module.exports = LoginPage;
