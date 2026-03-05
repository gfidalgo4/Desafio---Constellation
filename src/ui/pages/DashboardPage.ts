import { Page } from "@playwright/test";

export class DashboardPage {

  constructor(private page: Page) {}

  locators = {
    img_orangeHRM: () => this.page.locator('//img[@alt="client brand banner"]')
  };



}