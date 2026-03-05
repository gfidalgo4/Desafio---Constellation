import { Page } from "@playwright/test";

export class LoginPage {

  constructor(private page: Page) {}

  locators = {
    txt_username: () => this.page.locator('//input[@name="username"]'),
    txt_password: () => this.page.locator('//input[@name="password"]'),
    btn_login: () => this.page.locator('//button[contains(@class,"login")]'),
    lbl_wrongPass: () => this.page.locator('//p[text()="Invalid credentials"]'),
    lbl_requiredUser: () => this.page.locator('//input[@name="username"]/parent::div/following-sibling::span[text()="Required"]'),
    lbl_requiredPass: () => this.page.locator('//input[@name="password"]/parent::div/following-sibling::span[text()="Required"]')
  };

  async goto() {
    await this.page.goto('');
  }

  async login(username: string, password: string) {
    await this.locators.txt_username().fill(username);
    await this.locators.txt_password().fill(password);
    await this.locators.btn_login().click();
  }

}