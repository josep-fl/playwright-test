/**
 * This is a basic Playwright Test script to get you started!
 * Learn more about @playwright/test here: https://playwright.dev/docs/writing-tests
 */
const { expect, test } = require('@playwright/test')

// You can use test.describe to declare a group of related test cases
test.describe('Playwright home page', () => {
  // The callback in test.beforeEach will be executed before each test.
  test.beforeEach(async ({ page }) => {
    // Each test will be given a new page instance navigated to the this URL
    // For deployments Checkly will inject the deployment url as ENVIRONMENT_URL
    await page.goto(process.env.ENVIRONMENT_URL || 'https://playwright.dev/')
  })
  // Other useful hooks: test.beforeAll, test.afterEach, test.afterAll

  test('has a page title containing Playwright', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/)
  })

  test('has a "get started" link linking to the intro page', async ({ page }) => {
    // Create a locator based on a text selector.
    const getStarted = page.locator('text=Get Started')

    // Expect an attribute "to be strictly equal" to the value.
    await expect(getStarted).toHaveAttribute('href', '/docs/intro')

    // Click the get started link.
    await getStarted.click()

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/)
  })

  test.describe('has Open Graph tags', () => {
    const tags = ['description', 'title', 'url']

    // You can create tests from an array, by calling "test()" in a loop
    tags.forEach((tag) => {
      test(`has the Open Graph tag "${tag}"`, async ({ page }) => {
        await expect(page.locator(`meta[property="og:${tag}"]`)).toHaveCount(1)
      })
    })
  })
})