import { test, expect } from "@playwright/test";

test.describe("Registration", () => {
  const testEmail = `registration.test@simnova.sk`;

  test.beforeEach(async ({ page }) => {
    // GIVEN
    await page.goto("/registration");
  });

  // 1. test
  test("should load registration page", async ({ page }) => {
    await expect(page).toHaveScreenshot();
  });

  // 2. test
  test("should register user succesfully", async ({ page }) => {
    // fill email input
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(testEmail);

    // fill password input
    const registrationPasswordInput = page.getByTestId(
      "registration-password-input",
    );
    await registrationPasswordInput.fill("kolotoc");

    // fill confirm password input
    const registrationConfirmPasswordInput = page.getByTestId(
      "registration-confirm-password-input",
    );
    await registrationConfirmPasswordInput.fill("kolotoc");

    // WHEN
    // click submit
    const registrationSubmitButton = page.getByTestId(
      "registration-submit-button",
    );
    await registrationSubmitButton.click();

    await page.waitForURL("/login");

    expect(page.url()).toContain("/login");
  });
});
