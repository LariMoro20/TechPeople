import { describe, expect, it } from "vitest";
import { professionalsQuerySchema } from "../../server/utils/professionals.schema";

describe("professionalsQuerySchema", () => {
  it("aplica defaults quando nenhum parâmetro é enviado", () => {
    const result = professionalsQuerySchema.parse({});

    expect(result).toMatchObject({
      search: "",
      professions: [],
      sortField: "name",
      sortDirection: "asc",
      page: 1,
      perPage: 12,
    });
  });

  it("converte professions em string separada por vírgula para array", () => {
    const result = professionalsQuerySchema.parse({
      professions: "Frontend, Backend ,UX",
    });

    expect(result.professions).toEqual(["Frontend", "Backend", "UX"]);
  });

  it("coage minPrice e maxPrice de string para number", () => {
    const result = professionalsQuerySchema.parse({
      minPrice: "100",
      maxPrice: "500",
    });

    expect(result.minPrice).toBe(100);
    expect(result.maxPrice).toBe(500);
  });

  it("trata string vazia como undefined para campos numéricos opcionais", () => {
    const result = professionalsQuerySchema.parse({ minPrice: "" });

    expect(result.minPrice).toBeUndefined();
  });

  it("cai no fallback quando sortField é inválido", () => {
    const result = professionalsQuerySchema.parse({ sortField: "invalido" });

    expect(result.sortField).toBe("name");
  });

  it("cai no fallback quando page é menor que 1", () => {
    const result = professionalsQuerySchema.parse({ page: "0" });

    expect(result.page).toBe(1);
  });

  it("respeita o limite máximo de perPage", () => {
    const result = professionalsQuerySchema.parse({ perPage: "999" });

    expect(result.perPage).toBe(12);
  });

  it("converte available 'true'/'false' em boolean", () => {
    expect(professionalsQuerySchema.parse({ available: "true" }).available).toBe(
      true,
    );
    expect(professionalsQuerySchema.parse({ available: "false" }).available).toBe(
      false,
    );
  });
});
