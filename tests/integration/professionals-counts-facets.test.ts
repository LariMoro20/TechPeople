import { describe, expect, it } from "vitest";
import countsHandler from "../../server/api/professionals/counts.get";
import facetsHandler from "../../server/api/professionals/facets.get";
import { professionals } from "../../server/utils/professionalsRepository";

describe("GET /api/professionals/counts", () => {
  it("retorna o total e as contagens por profissão consistentes com os dados", () => {
    const response = countsHandler({} as never);

    expect(response.total).toBe(professionals.length);
    expect(response.available).toBe(
      professionals.filter((p) => p.available).length,
    );

    const sumOfProfessionCounts = response.professions.reduce(
      (sum, p) => sum + p.count,
      0,
    );
    expect(sumOfProfessionCounts).toBe(professionals.length);
    expect(response.specialties).toBe(response.professions.length);
  });

  it("contagem de cada profissão corresponde ao número real de registros", () => {
    const response = countsHandler({} as never);

    for (const { name, count } of response.professions) {
      const expectedCount = professionals.filter(
        (p) => p.profession === name,
      ).length;
      expect(count).toBe(expectedCount);
    }
  });
});

describe("GET /api/professionals/facets", () => {
  it("lista profissões únicas e ordenadas por pt-BR", () => {
    const response = facetsHandler({} as never);

    const expectedProfessions = [
      ...new Set(professionals.map((p) => p.profession)),
    ].sort((a, b) => a.localeCompare(b, "pt-BR"));

    expect(response.professions).toEqual(expectedProfessions);
  });

  it("lista cidades únicas e ordenadas por pt-BR", () => {
    const response = facetsHandler({} as never);

    const expectedCities = [...new Set(professionals.map((p) => p.city))].sort(
      (a, b) => a.localeCompare(b, "pt-BR"),
    );

    expect(response.cities).toEqual(expectedCities);
  });

  it("calcula min e max reais da faixa de preço", () => {
    const response = facetsHandler({} as never);
    const prices = professionals.map((p) => p.servicePrice);

    expect(response.priceRange.min).toBe(Math.min(...prices));
    expect(response.priceRange.max).toBe(Math.max(...prices));
    expect(response.priceRange.min).toBeLessThanOrEqual(
      response.priceRange.max,
    );
  });
});
