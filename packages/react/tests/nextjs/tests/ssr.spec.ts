import { test, expect } from "@playwright/test";

test("displays data after request finishes", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("body")).toContainText("Loading...");

  await expect(page.locator("body")).toContainText("Display data");
});
