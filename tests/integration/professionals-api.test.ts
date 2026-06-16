import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getQuery } from "h3";
import handler from "../../server/api/professionals/index.get";
import { professionalsQuerySchema } from "../../server/utils/professionals.schema";

vi.mock("h3", async () => {
  const actual = await vi.importActual<typeof import("h3")>("h3");
  return { ...actual, getQuery: vi.fn() };
});

function withQuery(query: Record<string, unknown>) {
  (getQuery as unknown as Mock).mockReturnValue(
    professionalsQuerySchema.parse(query),
  );
  return handler({} as never);
}

describe("GET /api/professionals", () => {
  beforeEach(() => {
    (getQuery as unknown as Mock).mockReset();
  });

  it("retorna a primeira página com o tamanho padrão", () => {
    const response = withQuery({});

    expect(response.meta.page).toBe(1);
    expect(response.data.length).toBeLessThanOrEqual(response.meta.perPage);
    expect(response.meta.total).toBeGreaterThan(0);
  });

  it("filtra por termo de busca ignorando acentuação e caixa", () => {
    const response = withQuery({ search: "back-end" });

    expect(response.data.length).toBeGreaterThan(0);
    for (const professional of response.data) {
      expect(professional.profession.toLowerCase()).toContain("back-end");
    }
  });

  it("filtra por uma ou mais profissões", () => {
    const response = withQuery({
      professions: "Desenvolvedor Front-end,UX Designer",
    });

    expect(response.data.length).toBeGreaterThan(0);
    for (const professional of response.data) {
      expect(["Desenvolvedor Front-end", "UX Designer"]).toContain(
        professional.profession,
      );
    }
  });

  it("filtra por faixa de preço", () => {
    const response = withQuery({ minPrice: "200", maxPrice: "250" });

    for (const professional of response.data) {
      expect(professional.servicePrice).toBeGreaterThanOrEqual(200);
      expect(professional.servicePrice).toBeLessThanOrEqual(250);
    }
  });

  it("filtra por disponibilidade", () => {
    const response = withQuery({ available: "true" });

    for (const professional of response.data) {
      expect(professional.available).toBe(true);
    }
  });

  it("ordena por preço ascendente", () => {
    const response = withQuery({
      sortField: "servicePrice",
      sortDirection: "asc",
      perPage: "60",
    });

    const prices = response.data.map((p) => p.servicePrice);
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  it("ordena por nome respeitando localidade pt-BR", () => {
    const response = withQuery({
      sortField: "name",
      sortDirection: "asc",
      perPage: "60",
    });

    const names = response.data.map((p) => p.name);
    const sorted = [...names].sort((a, b) =>
      a.localeCompare(b, "pt-BR", { sensitivity: "base" }),
    );
    expect(names).toEqual(sorted);
  });

  it("respeita a paginação e calcula totalPages corretamente", () => {
    const firstPage = withQuery({ perPage: "5", page: "1" });
    const secondPage = withQuery({ perPage: "5", page: "2" });

    expect(firstPage.data).toHaveLength(5);
    expect(secondPage.data).toHaveLength(5);
    expect(firstPage.data[0]!.id).not.toBe(secondPage.data[0]!.id);
    expect(firstPage.meta.totalPages).toBe(
      Math.ceil(firstPage.meta.total / 5),
    );
  });

  it("retorna lista vazia quando nenhum resultado corresponde aos filtros", () => {
    const response = withQuery({ search: "xxxxxxxxxxxxxxxxxx" });

    expect(response.data).toHaveLength(0);
    expect(response.meta.total).toBe(0);
    expect(response.meta.hasMore).toBe(false);
  });
});
