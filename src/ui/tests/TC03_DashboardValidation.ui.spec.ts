import { test } from '@playwright/test';
import * as func from "../../utils/UI_Helpers";
import { DashboardPage } from '../pages/DashboardPage';
import { menus } from '../fixtures/Menus';

test.beforeEach(async ({ page }) => {
    await test.step('Login', async () => {
        await func.loginAdmin(page);
    });
});

test('Dashboard widgets', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await test.step('Validate Dashboards', async () => {
        await dashboardPage.validateDashboards();
    });
});


test('Sidebar navigation', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    for (const menu of menus) {
        await test.step(`Navigate to ${menu.path}`, async () => {
            await dashboard.navigateToMenu(menu.name, menu.path);
        });
    } 
});