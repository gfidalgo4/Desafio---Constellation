import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { users } from '../fixtures/Users';

test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);

    const homePage = new DashboardPage(page);
    await expect(homePage.locators.img_orangeHRM()).toBeVisible();
});

/*
test('Failed login - Invalid Password', async ({ page }) => {
});

test('Successful login - Empty fields', async ({ page }) => {
});

test('Logout', async ({ page }) => {
});
*/