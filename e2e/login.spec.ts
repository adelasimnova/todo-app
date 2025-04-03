import { test, expect } from "@playwright/test";
import { randomUUID } from "crypto";

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  const testEmail = "registration.test4@simnova.sk";
  const testPassword = "kolotoc";

  // 1. test
  test("should load login page", async ({ page }) => {
    await expect(page).toHaveScreenshot();
  });

  // 2. test
  test("should login user succesfully", async ({ page }) => {
    const testEmail2 = `registration.test4${randomUUID()}@simnova.sk`;

    await page.goto("/registration");

    //// register user
    // fill valid email
    const registrationEmailInput = page.getByTestId("registration-email-input");
    await registrationEmailInput.fill(testEmail2);

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

    //// login user
    // fill valid email
    const loginEmailInput = page.getByTestId("login-email-input");
    await loginEmailInput.fill(testEmail2);

    // fill valid password
    const loginPasswordInput = page.getByTestId("login-password-input");
    await loginPasswordInput.fill(testPassword);

    // click submit
    const loginSubmitButton = page.getByTestId("login-submit-button");
    await loginSubmitButton.click();

    // wait to load the page
    await page.waitForURL("/");

    await expect(page).toHaveScreenshot();

    //// delete user
    const deleteUserButton = page.getByTestId("delete-user-button");
    await deleteUserButton.click();

    await page.waitForURL("/registration");

    expect(page.url()).toContain("/registration");
  });

  // 3. test
  test("should not login user with invalid email", async ({ page }) => {
    // GIVEN
    const invalidEmail = "invalidEmail.com";

    // fill invalid email
    const loginEmailInput = page.getByTestId("login-email-input");
    await loginEmailInput.fill(invalidEmail);

    // WHEN
    // click submit
    const loginSubmitButton = page.getByTestId("login-submit-button");
    await loginSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 4. test
  test("should not login user with invalid shorter password", async ({
    page,
  }) => {
    // GIVEN
    const invalidPassword = "pass";

    // fill valid email
    const loginEmailInput = page.getByTestId("login-email-input");
    await loginEmailInput.fill(testEmail);

    // fill invalid password
    const loginPasswordInput = page.getByTestId("login-password-input");
    await loginPasswordInput.fill(invalidPassword);

    // WHEN
    // click submit
    const loginSubmitButton = page.getByTestId("login-submit-button");
    await loginSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 5. test
  test("should not login user with invalid email (without text before @)", async ({
    page,
  }) => {
    // GIVEN
    const invalidEmail = "@simnova.sk";

    // fill invalid email
    const loginEmailInput = page.getByTestId("login-email-input");
    await loginEmailInput.fill(invalidEmail);

    // WHEN
    // click submit
    const loginSubmitButton = page.getByTestId("login-submit-button");
    await loginSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 6. test
  test("should not login user with invalid email (without text after @)", async ({
    page,
  }) => {
    // GIVEN
    const invalidEmail = "login.test@";

    // fill invalid email
    const loginEmailInput = page.getByTestId("login-email-input");
    await loginEmailInput.fill(invalidEmail);

    // WHEN
    // click submit
    const loginSubmitButton = page.getByTestId("login-submit-button");
    await loginSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 7. test
  test("should not login user with password over 30 characters", async ({
    page,
  }) => {
    // GIVEN
    const invalidPassword =
      "012345678901234567890123456789012345678901234012345678901234567890123456789012345678901234";

    // fill valid email
    const loginEmailInput = page.getByTestId("login-email-input");
    await loginEmailInput.fill(testEmail);

    // fill invalid password
    const loginPasswordInput = page.getByTestId("login-password-input");
    await loginPasswordInput.fill(invalidPassword);

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 8. test
  test("should not login user with no email", async ({ page }) => {
    // GIVEN
    const invalidEmail = "";

    // fill invalid email
    const loginEmailInput = page.getByTestId("login-email-input");
    await loginEmailInput.fill(invalidEmail);

    // WHEN
    // click submit
    const loginSubmitButton = page.getByTestId("login-submit-button");
    await loginSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 9. test
  test("should not login user with no password", async ({ page }) => {
    // GIVEN
    const invalidPassword = "";

    // fill valid email
    const loginEmailInput = page.getByTestId("login-email-input");
    await loginEmailInput.fill(testEmail);

    // fill invalid password
    const loginPasswordInput = page.getByTestId("login-password-input");
    await loginPasswordInput.fill(invalidPassword);

    // WHEN
    // click submit
    const loginSubmitButton = page.getByTestId("login-submit-button");
    await loginSubmitButton.click();

    // THEN
    await expect(page).toHaveScreenshot();
  });

  // 10. test
  test("email should not be longer than 200 chars", async ({ page }) => {
    // GIVEN
    const testEmailTooLong =
      "login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test@simnovasimnovasimnovasimnovasimnova.sk";

    // WHEN
    const loginEmailInput = page.getByTestId("login-email-input");
    await loginEmailInput.fill(testEmailTooLong);

    // THEN
    await expect(loginEmailInput).toHaveValue(
      "login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test.login.test@simnovasimnov",
    );
  });

  // 11. test
  test("'Register now' works sucessfully", async ({ page }) => {
    // click 'Register Now'
    const registerNowLink = page.getByTestId("registration-link");
    await registerNowLink.click();

    await page.waitForURL("/registration");

    expect(page.url()).toContain("/registration");
  });
});
