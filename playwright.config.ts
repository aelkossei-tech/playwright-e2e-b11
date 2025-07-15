import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // globalSetup: './tests/global-setup/global-setup.ts',
  // globalTeardown: './tests/global-setup/global-teardown.ts',
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 10000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    //['json', {  outputFile: 'playwright-report/test-results.json' }],
    ['junit', { outputFile: 'junitReports/reports.xml'}],
    ['html', { open: 'never' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //storageState: '',
    headless: false,
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: process.env.baseURL, // "https://www.techglobal-training.com"

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    navigationTimeout: 30000
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Regression',
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'Basics',
      testDir: './tests/basics',
      use: { 
        ...devices['Desktop Chrome'],
        // baseURL: "https://www.techglobal-training.com",
        headless: false,
        actionTimeout: 20000
      },
    },
    {
      name: 'Demo Blaze Chrome',
      testDir: './tests/demo-blaze',
      dependencies: ['Demo Blaze Set up'],
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: "https://demoblaze.com/index.html#",
        headless: false,
        storageState: './tests/auth/demo-blaze.json'
      },
    },
    {
      name: 'Demo Blaze Safari',
      testDir: './tests/demo-blaze',
      dependencies: ['Demo Blaze Set up'],
      use: { 
        ...devices['Desktop Safari'],
        baseURL: "https://demoblaze.com/index.html#",
        headless: false,
        storageState: './tests/auth/demo-blaze.json'
      },
    },
    {
      name: 'Demo Blaze Set up',
      testDir: './tests/demo-blaze-setup',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: "https://demoblaze.com/index.html#",
        headless: false
      },
    },
    {
      name: 'DB Automation',
      testDir: './tests/db-automation',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: {width: 1920, height: 1080 }
      },
    },

    // {
    //   name: 'API Automation',
    //   testDir: './tests/api',
    //   use: { 
    //     ...devices['Desktop Chrome'],
    //     viewport: {width: 1920, height: 1080 }
    //   },
    // }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});