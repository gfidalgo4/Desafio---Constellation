import { expect, Page } from "@playwright/test";
import { LoginPage } from "../ui/pages/LoginPage";
import { DashboardPage } from '../ui/pages/DashboardPage';
import { users } from "../ui/fixtures/Users";
import { menus } from '../ui/fixtures/Menus';

export async function loginAdmin(page: Page) {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username,users.admin.password);
    await expect(dashboardPage.locators.img_orangeHRM()).toBeVisible({ timeout: 10000 });
}


export function getMenu(name: string) {
    const menu = menus.find(m => m.name === name);

    if (!menu) throw new Error(`Menu ${name} not found`);

    return menu;
}