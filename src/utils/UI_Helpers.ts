import { expect, Page } from "@playwright/test";
import { LoginPage } from "../ui/pages/LoginPage";
import { DashboardPage } from '../ui/pages/DashboardPage';
import { users } from "../ui/fixtures/Users";

export async function loginAdmin(page: Page) {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username,users.admin.password);
    await expect(dashboardPage.locators.img_orangeHRM()).toBeVisible({ timeout: 10000 });
}