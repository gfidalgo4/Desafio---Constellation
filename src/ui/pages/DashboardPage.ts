import { Page } from "@playwright/test";

export class DashboardPage {

  constructor(private page: Page) {}

  locators = {
    img_orangeHRM: () => this.page.locator('//img[@alt="client brand banner"]'),
    btn_user: () => this.page.locator('//li[@class="oxd-userdropdown"]'),
    btn_logout: () => this.page.locator('//a[contains(@href,"logout")]')
  };

  async logout() {
    await this.locators.btn_user().click();
    await this.locators.btn_logout().click();
  }

}