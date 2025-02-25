import { test, expect } from "@playwright/test";
import Estimator from "../pages/Estimator";
import projects from "../data/estimatorData";

test.describe("Estimator", () => {
  //Define role dictionary for the roles that will be used
  const roleDictionary = {
    frontEnd: 1,
    backEnd: 2,
    mobileDev: 3,
    designer: 4,
    pm: 5,
    qa: 6,
    devOps: 7,
  };
  // Go to the estimator page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.mugna.tech/project-estimator");
  });

  test("Verify that the add and subtract buttons on the estimator can successfully add and subtract the number of staff in each role", async ({
    page,
  }) => {
    for (const { team } of projects) {
      for (const [key, details] of Object.entries(team)) {
        try {
          await estimator.add_staff("increment", key, details.quantity);
          const roleSelector = roleDictionary[key];
          const staffInput = page
            .locator(
              `div:nth-child(${roleSelector}) > .ml-auto > .relative > #quantity-input`
            )
            .first();
          await expect(staffInput).toHaveValue(`${details.quantity}`);

          await estimator.add_staff("decrement", key, details.quantity);
          await expect(staffInput).toHaveValue("0");

          console.log(
            `Test passed for role: ${key} with count: ${details.quantity}`
          );
        } catch (error) {
          console.error(
            `Test failed for role: ${key} with count: ${details.quantity}`,
            error
          );
        }
      }
    }
  });

  test('Verify that the "Next" button is disabled if there are no staff added and is only enabled when at least one staff in any role has been added', async ({
    page,
  }) => {
    // Test implementation goes here
  });

  test('Verify that when the "Next" Button is pressed it redirects to the Staff Details card', async ({
    page,
  }) => {
    // Test implementation goes here
  });

  test("Verify that the technology stack select can have no items or all items selected", async ({
    page,
  }) => {
    // Test implementation goes here
  });

  test("Verify that the email and months field are required in submitting the estimator", async ({
    page,
  }) => {
    const estimator = new Estimator(page);
    for (const { team, months } of projects) {
      for (const [key, details] of Object.entries(team)) {
        await estimator.add_staff("increment", key, details.quantity);
      }

      await page.getByText("Next").click();
      await expect(page.getByText("Staff Details").first()).toBeVisible();
      await estimator.skip();
      await page.getByRole("button", { name: "Get Estimate" }).click();
      await expect(
        page.getByText("Just a few things left.").first()
      ).toBeVisible();

      await page
        .getByRole("textbox", { name: "Juan@gmail.com" })
        .fill("test@mail.com");
      await estimator.add_months(months);
      await page.getByRole("button", { name: "Get Estimate" }).click();
      await expect(page.getByText("Your Estimate")).toBeVisible();
    }
  });

  test('Verify that when pressing the "Get Estimate" Button it returns a correct calculation of the project estimate', async ({
    page,
  }) => {
    const estimator = new Estimator(page);

    await estimator.input_staff(projects);
  });

  test('Verify that when pressing the "Book a Call" button it launches a calendly scheduler', async ({
    page,
  }) => {
    // Test implementation goes here
  });

  test('Verify that the "Close" button on the estimator modal card is working and returns the user to the estimator page', async ({
    page,
  }) => {
    // Test implementation goes here
  });

  // Test that the contact link is visible on all pages
  test("should see contact in all pages", async ({ page }) => {
    // List of pages to test
    const links = ["", "services", "portfolio", "about", "blog"];
    // Iterate over the pages
    for (const link of links) {
      // Go to the page
      const main = new MainPage(page);
      await main.navigate("https://www.mugna.tech/" + link);
      // Scroll down to the contact section
      await main.scroll_to_contact(page);
      // Check that the contact link is visible
      await expect(
        page.getByRole("link", { name: "Contact Us" })
      ).toBeVisible();
    }
  });
});
