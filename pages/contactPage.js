
import { expect } from '@playwright/test';

export class ContactPage {
  constructor(page) {
    this.page = page;

    // locators 
    this.nameInput = page.locator('input#name');
    this.emailInput = page.locator('input#email');
    this.phoneInput = page.locator('input#phone');
    this.subjectInput = page.locator('input#subject');
    this.messageTextarea = page.locator('textarea#description');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successMessage = page.getByText('Thanks for getting in touch');
  }

  async goto() {
    await this.page.goto('https://automationintesting.online/#contact');
    await expect(this.nameInput).toBeVisible({ timeout: 10000 });
  }

  async fillForm({ name, email, phone, subject, message }) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.subjectInput.fill(subject);
    await this.messageTextarea.fill(message);
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async getValidationMessage(locator) {
  return await locator.evaluate(el => el.validationMessage);
}

async isInvalid(locator) {
  return await locator.evaluate(el => !el.checkValidity());
}
}