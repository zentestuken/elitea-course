import { test, expect } from '@playwright/test';

test.describe('EPAM Services client work navigation', () => {
  test('user can open Client Work from Services', async ({ page }) => {
    await test.step('Navigate to https://www.epam.com/', async () => {
      await page.goto('https://www.epam.com/');
      const acceptCookies = page.getByRole('button', { name: 'Accept All', exact: true });
      if (await acceptCookies.isVisible().catch(() => false)) {
        await acceptCookies.click();
      }
    });

    await test.step('Select Services from the header menu', async () => {
      await page.getByRole('button').first().click();
      await page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name: 'Services', exact: true })
        .click();
      await expect(page).toHaveURL('https://www.epam.com/services');
    });

    await test.step('Click the Explore Our Client Work link', async () => {
      await page.getByRole('link', { name: 'Explore Our Client Work', exact: true }).click();
      await expect(page).toHaveURL('https://www.epam.com/services/client-work');
    });

    await test.step('Verify that the Client Work text is visible on the page', async () => {
      await expect(page.getByRole('heading', { name: 'Client Work', exact: true, level: 1 })).toBeVisible();
    });
  });
});
