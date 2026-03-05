import { test, expect } from '@playwright/test';
import * as func from "../../utils/UI_Helpers";
import { DashboardPage } from '../pages/DashboardPage';
import { PimPage } from '../pages/PimPage';

test.beforeEach(async ({ page }) => {
  await func.loginAdmin(page);
});

test('Navigate to PIM', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.clickMenu("Pim");
    
    const pimPage = new PimPage(page);
    await expect(pimPage.locators.tbl_pimList()).toBeVisible();
    await pimPage.locators.tbl_pimList().scrollIntoViewIfNeeded();
});

test('Search for an Employee', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.clickMenu("Pim");
    
    const pimPage = new PimPage(page);
    await expect(pimPage.locators.tbl_pimList()).toBeVisible();
    await pimPage.locators.tbl_pimList().scrollIntoViewIfNeeded();

    
});