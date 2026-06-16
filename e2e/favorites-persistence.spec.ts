import { expect, test } from "@playwright/test";

const STORAGE_KEY = "TECHPEOPLE-FAVORITE-PROFESSIONALS";

test.describe("Persistência de favoritos", () => {
  test("favorito sobrevive a um reload da página", async ({ page }) => {
    await page.goto("/professionals");

    const firstFavoriteButton = page
      .getByRole("button", { name: "Add to favorites" })
      .first();
    await firstFavoriteButton.waitFor({ state: "visible" });
    await firstFavoriteButton.click();

    const storedAfterClick = await page.evaluate(
      (key) => localStorage.getItem(key),
      STORAGE_KEY,
    );
    expect(storedAfterClick).not.toBeNull();
    expect(JSON.parse(storedAfterClick!)).toHaveLength(1);

    await page.reload();

    const storedAfterReload = await page.evaluate(
      (key) => localStorage.getItem(key),
      STORAGE_KEY,
    );

    expect(storedAfterReload).not.toBeNull();
    expect(JSON.parse(storedAfterReload!)).toHaveLength(1);

    await expect(
      page.getByRole("button", { name: "Remove from favorites" }).first(),
    ).toBeVisible();
  });
});
