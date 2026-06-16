import { expect, test } from "@playwright/test";

test.describe("Navegação da home para a listagem filtrada", () => {
  test("clicar em uma especialidade leva para /professionals já filtrado", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const specialtyLink = page
      .locator('a[href^="/professionals?professions="]')
      .first();
    const href = await specialtyLink.getAttribute("href");
    const expectedProfession = new URL(href!, page.url()).searchParams.get(
      "professions",
    );

    await specialtyLink.click();

    await expect(page).toHaveURL(/\/professionals\?professions=/, {
      timeout: 5000,
    });

    const url = new URL(page.url());
    const professionsParam = url.searchParams.get("professions");
    expect(professionsParam).toBe(expectedProfession);

    const resultsCount = page.getByText(/profissionais? encontrados?/);
    await expect(resultsCount).not.toContainText("500");

    const professionCheckbox = page.getByRole("checkbox", {
      name: professionsParam!,
    });
    await expect(professionCheckbox).toBeChecked();
  });
});
