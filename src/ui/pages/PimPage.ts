import { expect, Page } from "@playwright/test";

export class PimPage {

  constructor(private page: Page) {}

  locators = {
    tbl_pimList: () => this.page.locator('//div[@role="table"]'),
  };


}