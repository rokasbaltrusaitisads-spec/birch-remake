import { test, expect } from "@playwright/test";

test.describe("Rule builder", () => {
  test("displays canvas and JSON preview", async ({ page }) => {
    await page.goto("/rules");
    await expect(page.getByRole("heading", { name: "Automation Rules" })).toBeVisible();
    await expect(page.getByText("JSON preview")).toBeVisible();
    await expect(page.getByRole("button", { name: "Test run" })).toBeVisible();
  });
});
