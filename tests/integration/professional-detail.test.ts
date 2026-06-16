import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getRouterParam } from "h3";
import handler from "../../server/api/professionals/[id].get";
import { professionals } from "../../server/utils/professionalsRepository";

vi.mock("h3", async () => {
  const actual = await vi.importActual<typeof import("h3")>("h3");
  return { ...actual, getRouterParam: vi.fn() };
});

function withId(id: string | undefined) {
  (getRouterParam as unknown as Mock).mockReturnValue(id);
  return handler({} as never);
}

describe("GET /api/professionals/:id", () => {
  beforeEach(() => {
    (getRouterParam as unknown as Mock).mockReset();
  });

  it("retorna o profissional correspondente ao id", () => {
    const existing = professionals[0]!;

    const response = withId(existing.id);

    expect(response).toEqual(existing);
  });

  it("lança 404 quando o id não existe", () => {
    expect(() => withId("id-inexistente")).toThrow(
      expect.objectContaining({ statusCode: 404 }),
    );
  });

  it("lança 404 quando o id não é informado", () => {
    expect(() => withId(undefined)).toThrow(
      expect.objectContaining({ statusCode: 404 }),
    );
  });
});
