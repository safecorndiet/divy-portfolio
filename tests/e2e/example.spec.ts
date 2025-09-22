import { test, expect } from "@playwright/test";

test("home loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Divy Shah")).toBeVisible();
  await page.getByRole("link", { name: "View Learning Timeline" }).click();
  await expect(page.getByText("Learning Timeline")).toBeVisible();
});