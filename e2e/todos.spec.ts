import { test, expect } from "@playwright/test";
import { randomUUID } from "crypto";

test.describe("ToDos", () => {
  const testEmail = `registration.test${randomUUID()}@simnova.sk`;

  test.beforeEach(async ({ page }) => {
    // registracia usera
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

    // login usera
    // THEN
    await page.waitForURL("/login");

    expect(page.url()).toContain("/login");

    // fill email input
    const loginEmailInput = page.getByTestId("login-email-input");
    await loginEmailInput.fill(testEmail);

    // fill password input
    const loginPasswordInput = page.getByTestId("login-password-input");
    await loginPasswordInput.fill("kolotoc");

    // click submit
    const loginSubmitButton = page.getByTestId("login-submit-button");
    await loginSubmitButton.click();

    // wait to load the page
    await page.waitForURL("/");
  });

  // odstranenie usera
  test.afterEach(async ({ page }) => {
    const deleteUserButton = page.getByTestId("delete-user-button");
    await deleteUserButton.click();

    await page.waitForURL("/registration");

    expect(page.url()).toContain("/registration");
  });

  // 1. test
  test("should load todo page", async ({ page }) => {
    await page.waitForResponse((response) => {
      return (
        response.url().includes("/todos") &&
        response.request().method() === "GET" &&
        response.status() === 200
      );
    });
    await expect(page).toHaveScreenshot();
  });

  // 2. test
  test("should add todo", async ({ page }) => {
    // fill in input
    const todoInput = page.getByTestId("todo-input");
    await todoInput.fill("Clean bathroom");

    // click on + button
    const addButton = page.getByTestId("todo-add-button");
    await addButton.click();

    await page.waitForResponse((response) => {
      return (
        response.url().includes("/todos") &&
        response.request().method() === "GET" &&
        response.status() === 200
      );
    });
    await expect(page).toHaveScreenshot();
  });

  // 3. test
  test("should check off todo", async ({ page }) => {
    // fill in input
    const todoInput = page.getByTestId("todo-input");
    await todoInput.fill("Buy bread");

    // click on + button
    const addButton = page.getByTestId("todo-add-button");
    await addButton.click();

    // click checkbox
    const todoCheckbox = page.getByTestId("todo-item-checkbox");
    await todoCheckbox.click();

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
// nasli sme cez inspect na stranke dany input, pridali sme sme si donho unikatny atribut napr. data-testid="registration-email-input" vramci registrationform.tsx a pouzili sme getByTestId aby sme ten input nasli
// vyplnili sme mail pomocou zavolania funkcie fill, ktoru maju vymyslenu v playwright (najdeme to v dokumentacii)

// DONE
// 1. najst input a vyplnit, stlacit add button, pockat na request (request na server a cakam na response, k tomu dostanem cez inspect: network) a nakoniec screenshot
// 2. najst checkbox, odkliknut ho, pockat na request, ten bude iny (nebol?), treba si zistit ako predtym, potom screenshot

// TODO
// 3. najst todo a vymazat (na FB katka poslala kod, ako rozoznat a najst to spravne Todo, checkbox a delete button)
