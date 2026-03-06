import { test, expect } from '@playwright/test';
import * as func from "../../utils/UI_Helpers";
import { DashboardPage } from '../pages/DashboardPage';
import { PimPage } from '../pages/PimPage';

test.beforeEach(async ({ page }) => {
    await test.step('Login', async () => {
        await func.loginAdmin(page);
    });
});

test('Navigate to PIM', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await test.step('Menu PIM', async () => {
        await dashboardPage.clickMenu("Pim");
    });
    
    const pimPage = new PimPage(page);
    await test.step('Validate employee list', async () => {
        await expect(pimPage.locators.tbl_pimList()).toBeVisible();
        await pimPage.locators.tbl_pimList().scrollIntoViewIfNeeded();
    });
});

test('Search for an Employee', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await test.step('Menu PIM', async () => {
        await dashboardPage.clickMenu("Pim");
    });
    
    const pimPage = new PimPage(page);
    await test.step('Search employee', async () => {
        await pimPage.searchEmployee({ name: 'john' });
        await pimPage.validateTable("Name", "john")
    });
});

test('Add a new Employee', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await test.step('Menu PIM', async () => {
        await dashboardPage.clickMenu("Pim");
    });
    
    const pimPage = new PimPage(page);
    await test.step('Add employee', async () => {
        await pimPage.addEmployee({ firstName: 'Gonçalo', lastName: 'Fidalgo' });
    });
    
    await test.step('Delete employee created', async () => {
        await dashboardPage.clickMenu("Pim");
        await pimPage.searchEmployee({ name: "Gonçalo Fidalgo" });
        await pimPage.deleteEmployee();
    });
});