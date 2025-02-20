import { test, expect } from "@playwright/test";
import { randomUUID } from "crypto";

test.describe("ToDos", () => {
  const testEmail = `registration.test${randomUUID()}@simnova.sk`;
  const testPassword = "kolotoc";

  test.beforeEach(async ({ page }) => {
    // GIVEN
    await page.goto("/registration");

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

    // THEN
    await page.waitForURL("/login");

    expect(page.url()).toContain("/login");

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
  });

  test.afterEach(async ({ page }) => {
    const deleteUserButton = page.getByTestId("delete-user-button");
    await deleteUserButton.click();

    await page.waitForURL("/registration");

    expect(page.url()).toContain("/registration");
  });

  test.only("should load todo page", async ({ page }) => {
    await page.waitForResponse((response) => {
      return (
        response.url().includes("/todos") &&
        response.request().method() === "GET" &&
        response.status() === 200
      );
    });
    await expect(page).toHaveScreenshot();
  });
});
// test.describe (terminus technikus) Slúži na zoskupenie testov, čo zlepšuje organizáciu a čitateľnosť kódu.
// my sme ju pomenovali "ToDos", budeme testovat pridanie, odfajknutie a vymazanie todo itemu
// "test("popis testu", async ({ page }) =>" toto je zaklad
// je to asynchr. funkcia, await proste napisem aby to slo
// nasli sme cez inspect na stranke dany input, pridali sme sme si donho atribut data-testid="registration-email-input" vramci registrationform.tsx a pouzili sme getByTestId aby sme tnen input nasli
// vyplnili sme mail pomocou zavolania funkcie fill, ktoru maju vymylenu v playwright a najdeme to v dokumentacii
