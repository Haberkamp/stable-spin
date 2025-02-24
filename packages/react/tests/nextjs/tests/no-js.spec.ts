import { test, expect } from "@playwright/test";

test.use({ javaScriptEnabled: false });

test("displays an inital state of loading", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("body")).toContainText("Loading...");
});
