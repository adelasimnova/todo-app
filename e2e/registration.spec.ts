import { test, expect } from "@playwright/test";
import { randomUUID } from "crypto";

test.describe("Registration", () => {
  const testEmail = "registration.test2@simnova.sk";
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
    test.setTimeout(60000);
    const testEmail = `registration.test${randomUUID()}@simnova.sk`;
    const testPassword = "kolotoc";
    // fill valid email
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(testEmail);

    // fill valid password
    const registrationPasswordInput = page.getByTestId(
      "registration-password-input",
    );
    await registrationPasswordInput.fill(testPassword);

    // fill valid confirm password
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
    // fill valid email
    const loginEmailInput = page.getByTestId("login-email-input");
    await loginEmailInput.fill(testEmail);

    // fill valid password
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
    const invalidEmail = "invalidEmail.com";

    // fill invalid email
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(invalidEmail);

    // WHEN
    // click submit
    const registrationSubmitButton = page.getByTestId(
      "registration-submit-button",
    );
    await registrationSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 4. test
  test("should not register user with invalid shorter password", async ({
    page,
  }) => {
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
    // click submit
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
    // click submit
    const registrationSubmitButton = page.getByTestId(
      "registration-submit-button",
    );
    await registrationSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 6. test
  test("should not register user with invalid email (without text before @)", async ({
    page,
  }) => {
    // GIVEN
    const invalidEmail = "@simnova.sk";

    // fill invalid email
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(invalidEmail);

    // WHEN
    // click submit
    const registrationSubmitButton = page.getByTestId(
      "registration-submit-button",
    );
    await registrationSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 7. test
  test("should not register user with invalid email (without text after @)", async ({
    page,
  }) => {
    // GIVEN
    const invalidEmail = "registration.test@";

    // fill invalid email
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(invalidEmail);

    // WHEN
    // click submit
    const registrationSubmitButton = page.getByTestId(
      "registration-submit-button",
    );
    await registrationSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 8. test
  test("should not register user with password over 30 characters", async ({
    page,
  }) => {
    // GIVEN
    const invalidPassword =
      "012345678901234567890123456789012345678901234012345678901234567890123456789012345678901234";

    // fill valid email
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(testEmail);

    // fill invalid password
    const registrationPasswordInput = page.getByTestId(
      "registration-password-input",
    );
    await registrationPasswordInput.fill(invalidPassword);

    // fill invalid confirm password
    const registrationConfirmPasswordInput = page.getByTestId(
      "registration-confirm-password-input",
    );
    await registrationConfirmPasswordInput.fill(invalidPassword);

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 9. test
  test("should not register user with no email", async ({ page }) => {
    // GIVEN
    const invalidEmail = "";

    // fill invalid email
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(invalidEmail);

    // WHEN
    // click submit
    const registrationSubmitButton = page.getByTestId(
      "registration-submit-button",
    );
    await registrationSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 10. test
  test("should not register user with no password", async ({ page }) => {
    // GIVEN
    const invalidPassword = "";

    // fill valid email
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(testEmail);

    // fill invalid password
    const registrationPasswordInput = page.getByTestId(
      "registration-password-input",
    );
    await registrationPasswordInput.fill(invalidPassword);

    // WHEN
    // click submit
    const registrationSubmitButton = page.getByTestId(
      "registration-submit-button",
    );
    await registrationSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 11. test
  test("should not register when password and confirm password do not match", async ({
    page,
  }) => {
    // GIVEN
    const invalidConfirmPassword = "kolotoc1234";

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
    // click submit
    const registrationSubmitButton = page.getByTestId(
      "registration-submit-button",
    );
    await registrationSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 12. test
  test("email should not be longer than 200 chars", async ({ page }) => {
    // GIVEN
    const testEmailTooLong =
      "registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test@simnovasimnovasimnovasimnovasimnova.sker";

    // WHEN
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(testEmailTooLong);

    // THEN
    await expect(registrationEmailInput).toHaveValue(
      "registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.registration.test.re",
    );
  });

  // 13. test
  test("'Login Now' works sucessfully", async ({ page }) => {
    // click 'Login Now'
    const loginNowLink = page.getByTestId("login-link");
    await loginNowLink.click();

    await page.waitForURL("/login");

    expect(page.url()).toContain("/login");
  });
});

// ToDo
// 7. test ze confirm heslo je pridlhe
// 8. test ze confirm heslo uplne chyba
