import { test, expect } from "@playwright/test";

test.describe("Registration", () => {
  const testEmail = "registration.test@simnova.sk";
  const testPassword = "kolotoc";

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
    await registrationPasswordInput.fill(testPassword);

    // fill confirm password input
    const registrationConfirmPasswordInput = page.getByTestId(
      "registration-confirm-password-input",
    );
    await registrationConfirmPasswordInput.fill(testPassword);

    // WHEN
    // click submit
    const registrationSubmitButton = page.getByTestId(
      "registration-submit-button",
    );
    await registrationSubmitButton.click();

    await page.waitForURL("/login");

    expect(page.url()).toContain("/login");

    //// login user so then i can delete him
    // fill email input
    const loginEmailInput = page.getByTestId("login-email-input");
    await loginEmailInput.fill(testEmail);

    // fill password input
    const loginPasswordInput = page.getByTestId("login-password-input");
    await loginPasswordInput.fill(testPassword);

    // click submit
    const loginSubmitButton = page.getByTestId("login-submit-button");
    await loginSubmitButton.click();

    // wait to load the page
    await page.waitForURL("/");

    // delete user
    const deleteUserButton = page.getByTestId("delete-user-button");
    await deleteUserButton.click();

    await page.waitForURL("/registration");

    expect(page.url()).toContain("/registration");
  });

  // 3. test
  test("should not register user with invalid email", async ({ page }) => {
    // GIVEN
    const invalidEmail = "invalidEmail";
    // fill invalid email
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(invalidEmail);

    // WHEN
    const registrationSubmitButton = page.getByTestId(
      "registration-submit-button",
    );
    await registrationSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 4. test
  test("should not register user with invalid password", async ({ page }) => {
    // GIVEN
    const invalidPassword = "pass";
    // fill valid email
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(testEmail);

    // fill invalid password
    const registrationPasswordInput = page.getByTestId(
      "registration-password-input",
    );
    await registrationPasswordInput.fill(invalidPassword);

    // WHEN
    const registrationSubmitButton = page.getByTestId(
      "registration-submit-button",
    );
    await registrationSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 5. test
  test("should not register user with invalid confirm password", async ({
    page,
  }) => {
    // GIVEN
    const invalidConfirmPassword = "pass";
    // fill valid email
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(testEmail);

    // fill valid password
    const registrationPasswordInput = page.getByTestId(
      "registration-password-input",
    );
    await registrationPasswordInput.fill(testPassword);

    // fill invalid confirm password
    const registrationConfirmPasswordInput = page.getByTestId(
      "registration-confirm-password-input",
    );
    await registrationConfirmPasswordInput.fill(invalidConfirmPassword);

    // WHEN
    const registrationSubmitButton = page.getByTestId(
      "registration-submit-button",
    );
    await registrationSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });
});
