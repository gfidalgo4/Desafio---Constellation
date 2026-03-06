import { expect, Page } from "@playwright/test";

export class DashboardPage {

  constructor(private page: Page) {}

  locators = {
    img_orangeHRM: () => this.page.locator('//img[@alt="client brand banner"]'),
    btn_user: () => this.page.locator('//li[@class="oxd-userdropdown"]'),
    btn_logout: () => this.page.locator('//a[contains(@href,"logout")]'),
    lbl_titulo: () => this.page.locator('//h6')
  };

  async logout() {
    await this.locators.btn_user().click();
    await this.locators.btn_logout().click();
  }

  async clickMenu(menu: string) {
    await this.page.locator(`//a[contains(@href,"${menu}")]`).click();
    await expect(this.locators.lbl_titulo()).toBeVisible({ timeout: 20000 });
    await expect(this.locators.lbl_titulo()).toContainText(new RegExp(menu, 'i'));
  }
}