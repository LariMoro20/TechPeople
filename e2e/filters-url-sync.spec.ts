import { expect, test } from "@playwright/test";

test.describe("Filtros sincronizados com a URL", () => {
  test("busca atualiza a URL e sobrevive a um reload", async ({ page }) => {
    await page.goto("/professionals", { waitUntil: "networkidle" });

    const resultsCount = page.getByText(/profissionais? encontrados?/);
    await expect(resultsCount).toContainText("500");

    const searchInput = page.getByPlaceholder("Nome ou especialidade...");

    // A página busca profissionais e facets dentro do Suspense do Nuxt; a
    // hidratação real só termina quando esses fetches resolvem. Interagir
    // antes disso faz o Vue sobrescrever o valor digitado quando a
    // hidratação finalmente sincroniza o DOM com o estado inicial.
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
