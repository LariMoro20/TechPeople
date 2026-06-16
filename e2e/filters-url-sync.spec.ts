import { expect, test } from "@playwright/test";

test.describe("Filtros sincronizados com a URL", () => {
  test("busca atualiza a URL e sobrevive a um reload", async ({ page }) => {
    await page.goto("/professionals", { waitUntil: "networkidle" });

    const resultsCount = page.getByText(/profissionais? encontrados?/);
    await expect(resultsCount).toContainText("500");

    const searchInput = page.getByPlaceholder("Nome ou especialidade...");
    await searchInput.fill("UX Designer");

    await expect(page).toHaveURL(/search=UX(\+|%20)Designer/, {
      timeout: 5000,
    });
    await expect(resultsCount).not.toContainText("500");

    const filteredCountText = await resultsCount.textContent();

    await page.reload();

    await expect(page).toHaveURL(/search=UX(\+|%20)Designer/);
    await expect(searchInput).toHaveValue("UX Designer");
    await expect(resultsCount).toHaveText(filteredCountText!);
  });
});
