import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { users } from '../fixtures/Users';

test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.locators.img_orangeHRM()).toBeVisible();
});

test('Failed login - Invalid Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, "123");

    await expect(loginPage.locators.lbl_wrongPass()).toBeVisible();
});

test('Failed login - Empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("", "");

    await expect(loginPage.locators.lbl_requiredUser()).toBeVisible();
    await expect(loginPage.locators.txt_password()).toBeVisible();
});

test('Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.locators.img_orangeHRM()).toBeVisible();
    await dashboardPage.logout();
    
    await expect(loginPage.locators.btn_login()).toBeVisible();
});
