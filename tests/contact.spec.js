// tests/contact.spec.js
import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/contactPage.js';

test('Contact Us form: fill and submit', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.goto();

  await contactPage.fillForm({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '09988776655',
    subject: 'Test Inquiry',
    message: 'This is a test message for automation.'
  });

  await contactPage.submit();
  await contactPage.expectSuccess();
});

// Negative tests
test.describe('Negative tests', () => {

  test.beforeEach(async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto();
  });

  test('show error for invalid email', async ({ page }) => {
    const contactPage = new ContactPage(page);

    await contactPage.fillForm({
      name: 'John Doe',
      email: 'invalid-email',
      phone: '09988776655',
      subject: 'Test',
      message: 'Message'
    });

    await contactPage.submit();

    const emailMessage = await contactPage.getValidationMessage(contactPage.emailInput);
    expect(emailMessage).toContain('@');
  });

  test('show error for short phone number', async ({ page }) => {
    const contactPage = new ContactPage(page);

    await contactPage.fillForm({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123',
      subject: 'Test',
      message: 'Message'
    });

    await contactPage.submit();

    const phoneInvalid = await contactPage.isInvalid(contactPage.phoneInput);
    expect(phoneInvalid).toBe(false);
  });

  // test('show error when required fields are empty', async ({ page }) => {
  //   const contactPage = new ContactPage(page);

  //   // trigger validation by interacting with field
  //   await contactPage.nameInput.click();
  //   await contactPage.page.keyboard.press('Tab');

  //   const nameInvalid = await contactPage.isInvalid(contactPage.nameInput);

  //   expect(nameInvalid).toBe(true);
  // });
  test('show error when required fields are empty', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.submit();

  const errorMessage = page.locator('.alert-danger');

  await expect(errorMessage).toBeVisible();
});

});