import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'reports/html-report' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  expect: {
    timeout: 20000
  },

  projects: [
    {
      name: 'ui',
      testMatch: /.*\.ui\.spec\.ts/, //sufixo para os testes UI
      use: {
        channel: 'chrome', // usa Chrome instalado
        headless: false, //visualizaçao do browser
        video: 'on-first-retry', // 'retain-on-failure' - grava video se falhar
        screenshot: 'only-on-failure',    
        baseURL: process.env.BASE_URL,
        //baseURL: 'https://opensource-demo.orangehrmlive.com',
      },
    },
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        baseURL: process.env.API_BASE_URL,
        //baseURL: 'https://reqres.in/',
        extraHTTPHeaders: {
          //'x-api-key': 'reqres_e7455c7699cb445994c20d8cb900a06c'
          'x-api-key': process.env.API_TOKEN!
        }
      },
    },
  ],

});
