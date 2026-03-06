import { expect, Page } from "@playwright/test";

export class PimPage {

    constructor(private page: Page) {}

    locators = {
        tbl_pimList: () => this.page.locator('//div[@role="table"]'),
        txt_name: () => this.page.locator('//label[text()="Employee Name"]/parent::div/following-sibling::div//input'),
        txt_id: () => this.page.locator('//label[text()="Employee Id"]/parent::div/following-sibling::div//input'),
        ddl_status: () => this.page.locator('//label[text()="Employment Status"]/parent::div/following-sibling::div'),
        ddl_include: () => this.page.locator('//label[text()="Include"]/parent::div/following-sibling::div'),
        txt_supervisor: () => this.page.locator('//label[text()="Supervisor Name"]/parent::div/following-sibling::div//input'),
        ddl_job: () => this.page.locator('//label[text()="Job Title"]/parent::div/following-sibling::div'),
        ddl_unit: () => this.page.locator('//label[text()="Sub Unit"]/parent::div/following-sibling::div'),
        btn_search: () => this.page.locator('//button[@type="submit"]'),
        lbl_noRecordFound: () => this.page.locator('//span[text()="No Records Found"]'),
        btn_add: () => this.page.locator("//button[contains(.,'Add')]"),
        txt_firstName: () => this.page.locator('//input[@name="firstName"]'),
        txt_middleName: () => this.page.locator('//input[@name="middleName"]'),
        txt_lastName: () => this.page.locator('//input[@name="lastName"]'),
        txt_employeeId: () => this.page.locator('//input[@name="lastName"]'),
        txt_file: () => this.page.locator('//input[@type="file"]'),
        btn_save: () => this.page.locator('//button[@type="submit"]'),
        btn_trash: () => this.page.locator('//i[contains(@class,"trash")]'),
        btn_yesDelete: () => this.page.locator("//button[contains(.,'Yes, Delete')]"),
        lbl_successSave: () => this.page.locator('//p[text()="Successfully Saved"]'),
        lbl_successDelete: () => this.page.locator('//p[text()="Successfully Deleted"]'),
    };


async searchEmployee({ name,id,status,include,supervisor,job,unit}: {
  name?: string;
  id?: string;
  status?: string;
  include?: string;
  supervisor?: string;
  job?: string;
  unit?: string;}) 
  {
    await this.page.locator('//div[@role="columnheader"]').first().waitFor();
    if (name) await this.locators.txt_name().fill(name);
    if (id) await this.locators.txt_id().fill(id);
    if (status) {
        await this.locators.ddl_status().click();
        await this.page.locator(`//*[text()="${status}"]`).click();
    }
    if (include) {
        await this.locators.ddl_include().click();
        await this.page.locator(`//*[text()="${include}"]`).click();
    }
    if (supervisor) await this.locators.txt_supervisor().fill(supervisor);
    if (job) {
        await this.locators.ddl_job().click();
        await this.page.locator(`//*[text()="${job}"]`).click();
    }
    if (unit) {
        await this.locators.ddl_unit().click();
        await this.page.locator(`//*[text()="${unit}"]`).click();
    }

    await this.locators.btn_search().click();
    await this.page.locator('//div[@role="columnheader"]').first().waitFor();
    
  }

  async validateTable(column: string, name: string){
    if (await this.locators.lbl_noRecordFound().isVisible({ timeout: 3000 })) {
        console.log('No records found in the table.');
        return;
    }
 
    let columnIndex = -1;
    await this.locators.tbl_pimList().scrollIntoViewIfNeeded();
    const headersCount = await this.page.locator('//div[@role="columnheader"]').count();
    for (let i = 1; i < headersCount; i++){
        const text = await this.page.locator(`//div[@role="columnheader"][${i}]`).textContent();
        if(text?.includes(column)){
            columnIndex = i;
            break;
        }
    }

    if (columnIndex === -1) {
        throw new Error(`Column ${column} not found`);
    }

    if(column.includes("Name")){
        const rows = this.page.locator('//div[@role="row"]');
        const rowCount = await rows.count();

        for (let i =1; i < rowCount; i++) { //start 1, 0 é header
            const firstName = await rows.nth(i).locator('//div[@role="cell"]').nth(columnIndex-1).textContent(); //nth position
            const lastName = await rows.nth(i).locator('//div[@role="cell"]').nth(columnIndex).textContent();

            const fullText = `${firstName} ${lastName}`;

            await expect(fullText.toString().toLowerCase()).toContain(name.toString().toLowerCase());
        }
    }
    else{
        const values = await this.page.locator(`//div[@role="row"]/div[@role="cell"][${columnIndex}]`).allTextContents();
        for (const value of values) {
            await expect(value.toLowerCase()).toContain(name.toLowerCase());
        }
    }
    
  }

  async addEmployee({ firstName,middleName,lastName,id,file}: {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  id?: string;
  file?: string;}) 
  {
    await this.locators.btn_add().click();
    if (firstName) await this.locators.txt_firstName().fill(firstName);
    if (middleName) await this.locators.txt_middleName().fill(middleName);
    if (lastName) await this.locators.txt_lastName().fill(lastName);
    if (id) await this.locators.txt_employeeId().fill(id);
    if (file) await this.locators.txt_file().fill(file);

    await this.locators.btn_save().click();
    await this.locators.lbl_successSave().waitFor();
    await expect(this.locators.lbl_successSave()).toBeVisible();
    
  }

  async deleteEmployee() 
  {
    const trashCount = await this.locators.btn_trash().count();

    if (trashCount > 1) throw new Error(`More than one person found to delete`);
    if (trashCount == 0)throw new Error(`No person found to delete`);

    await this.locators.btn_trash().click();

    await this.locators.btn_yesDelete().click();
    await this.locators.lbl_successDelete().waitFor();
    await expect(this.locators.lbl_successDelete()).toBeVisible();
    
  }
}