import { expect, Page } from "@playwright/test";

export class DashboardPage {

  constructor(private page: Page) {}

  locators = {
    img_orangeHRM: () => this.page.locator('//img[@alt="client brand banner"]'),
    btn_user: () => this.page.locator('//li[@class="oxd-userdropdown"]'),
    btn_logout: () => this.page.locator('//a[contains(@href,"logout")]'),
    lbl_titulo: () => this.page.locator('(//h6)[1]'),
    das_timeToWork: () => this.page.locator('//p[text()="Time at Work"]/ancestor::div[contains(@class,"dashboard-widget")]//canvas'),
    das_myActions: () => this.page.locator('//p[text()="My Actions"]/ancestor::div[contains(@class,"dashboard-widget")]//div[@class="orangehrm-todo-list"]'),
    das_quickLaunch: () => this.page.locator('//p[text()="Quick Launch"]/ancestor::div[contains(@class,"dashboard-widget")]//div[@class="orangehrm-dashboard-widget-body"]/div'),
    das_buzzLatestPosts: () => this.page.locator('//p[text()="Buzz Latest Posts"]/ancestor::div[contains(@class,"dashboard-widget")]//div[contains(@class,"orangehrm-dashboard-widget-body")]'),
    das_employeesLeaveToday: () => this.page.locator('//p[text()="Employees on Leave Today"]/ancestor::div[contains(@class,"dashboard-widget")]//div[@class="orangehrm-dashboard-widget-body"]'),
    das_employeeDistributionSubUnit: () => this.page.locator('//p[text()="Employee Distribution by Sub Unit"]/ancestor::div[contains(@class,"dashboard-widget")]//div[@class="orangehrm-dashboard-widget-body"]'),
    das_employeeDistributionLocation: () => this.page.locator('//p[text()="Employee Distribution by Location"]/ancestor::div[contains(@class,"dashboard-widget")]//div[@class="orangehrm-dashboard-widget-body"]'),
    
  };

  async logout() {
    await this.locators.btn_user().click();
    await this.locators.btn_logout().click();
  }

  async navigateToMenu(menuName: string, menuPath: string) {
    await this.page.locator(`//a[contains(@href,"${menuPath}")]`).click();
    await this.page.locator(`(//h6[contains(.,"${menuName}")])[1]`).waitFor({ timeout: 20000 });
    await expect(this.locators.lbl_titulo()).toContainText(menuName);
  }

  async validateDashboards() {
    await expect(this.locators.das_timeToWork()).toBeVisible({ timeout: 20000 });
    await expect(this.locators.das_myActions()).toBeVisible({  });
    await this.locators.das_quickLaunch().scrollIntoViewIfNeeded();
    await expect(this.locators.das_quickLaunch()).toBeVisible({  });
    await expect(this.locators.das_buzzLatestPosts()).toBeVisible({  });
    await this.locators.das_employeesLeaveToday().scrollIntoViewIfNeeded();
    await expect(this.locators.das_employeesLeaveToday()).toBeVisible({  });
    await expect(this.locators.das_employeeDistributionSubUnit()).toBeVisible({  });
    await this.locators.das_employeeDistributionLocation().scrollIntoViewIfNeeded();
    await expect(this.locators.das_employeeDistributionLocation()).toBeVisible({  });
  }
}