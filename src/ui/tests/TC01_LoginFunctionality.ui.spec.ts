import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { users } from '../fixtures/Users';

test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Login', async () => {
        await loginPage.goto();
        await loginPage.login(users.admin.username, users.admin.password);
    });

    const dashboardPage = new DashboardPage(page);
    await test.step('Success Login', async () => {
        await expect(dashboardPage.locators.img_orangeHRM()).toBeVisible();
    });
});

test('Failed login - Invalid Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Login', async () => {
        await loginPage.goto();
        await loginPage.login(users.admin.username, "123");
    });
    await test.step('Invalid Password', async () => {
        await expect(loginPage.locators.lbl_wrongPass()).toBeVisible();
    });
});

test('Failed login - Empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Login', async () => {
        await loginPage.goto();
        await loginPage.login("", "");
    });

    await test.step('Required Filds', async () => {
        await expect(loginPage.locators.lbl_requiredUser()).toBeVisible();
        await expect(loginPage.locators.lbl_requiredPass()).toBeVisible();
    });
});

test('Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Login', async () => {
        await loginPage.goto();
        await loginPage.login(users.admin.username, users.admin.password);
    });

    const dashboardPage = new DashboardPage(page);
    await test.step('Success Login', async () => {
        await expect(dashboardPage.locators.img_orangeHRM()).toBeVisible();
    });
    await test.step('Logout', async () => {
        await dashboardPage.logout();
        await expect(loginPage.locators.btn_login()).toBeVisible();
    });
    
});
