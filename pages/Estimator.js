import CommonActions from "../common_actions/common_actions";
import { expect } from "@playwright/test";
import estimateProjectCost from "../common_actions/projectCost";

export default class Estimator {
  constructor(page) {
    this.page = page;
    this.commonActions = new CommonActions(page);
    this.url = "https://www.mugna.tech/project-estimator";
    this.roleDictionary = {
        frontEnd: 1,
        backEnd: 2,
        mobileDev: 3,
        designer: 4,
        pm: 5,
        qa: 6,
        devOps: 7,
      };
  }

  async navigate(url = this.url) {
    await this.commonActions.navigate(url);
  }

  async scroll_to_contact() {
    await this.page.getByRole("link", { name: "Contact Us" }).click();
  }

  async skip() {
    await this.page.getByText("Next").click();
  }

  async add_staff(buttonType, role, count) {
    

    // Determine the roleSelector based on the role
    let roleSelector = this.roleDictionary[role]; // returns the corresponding numeric value for the role
    let buttonSelector;
    switch (buttonType) {
      case "increment":
        if (roleSelector < 5) {
          buttonSelector = `div:nth-child(${roleSelector}) > .ml-auto > .relative > #increment-button`;
        } else {
          buttonSelector = `div:nth-child(2) > div:nth-child(${
            roleSelector - 4
          }) > .ml-auto > .relative > #increment-button`;
        }
        break;
      case "decrement":
        if (roleSelector < 5) {
          buttonSelector = `div:nth-child(${roleSelector}) > .ml-auto > .relative > #decrement-button`;
        } else {
          buttonSelector = `div:nth-child(2) > div:nth-child(${
            roleSelector - 4
          }) > .ml-auto > .relative > #decrement-button`;
        }
        break;
      default:
        throw new Error(`Invalid button type: ${buttonType}`);
    }
    for (let i = 0; i < count; i++) {
      await this.page.locator(buttonSelector).first().click();
    }
  }

  async select_technology_stack(team) {
    let childCounter = 1;
    for (const [key, details] of Object.entries(team)) {
      
      await this.page
        .locator("div")
        .filter({ hasText: /^Select Tech Stack$/ })
        .nth(childCounter +1)
        .click();
        

      for (let i = 0; i < details.tech.length; i++) {
        await this.page.locator(`text=${details.tech[i]}`).first().click();
      }
      await this.page.locator('text=Staff Details').first().click();
    }
  }

  async add_months(count) {
    for (let i = 0; i < count; i++) {
      await this.page.getByRole("button").nth(1).click();
    }
  }

  async input_staff(projects) {
    for (const { team, months, expected } of projects) {
      for (const [key, details] of Object.entries(team)) {
        await this.add_staff("increment", key, details.quantity);
      }

      await this.page.getByText("Next").click();
      await expect(this.page.getByText("Staff Details").first()).toBeVisible();
      await this.skip();
      await this.page
        .getByRole("textbox", { name: "Juan@gmail.com" })
        .fill("test@mail.com");
      await this.add_months(months);
      await this.page.getByRole("button", { name: "Get Estimate" }).click();
      await expect(this.page.getByText("Your Estimate")).toBeVisible();
      const textValue = await this.page
        .locator(".ml-auto.text-right")
        .locator("p")
        .nth(1)
        .innerText();
      const intValue = parseInt(textValue.replace(/[,$.]/g, ""), 10) / 100;
      console.log(`Expected: ${expected}, Received: ${intValue}`);
      expect(intValue).toBe(expected);
    }
  }

  async get_estimate(projectType, projectSize) {}
}
