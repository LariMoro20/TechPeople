import { describe, expect, it } from "vitest";
import { normalize } from "../../server/utils/text";

describe("normalize", () => {
  it("remove acentos", () => {
    expect(normalize("José")).toBe("jose");
  });

  it("converte para minúsculas", () => {
    expect(normalize("DESENVOLVEDOR")).toBe("desenvolvedor");
  });

  it("remove espaços nas extremidades", () => {
    expect(normalize("  Ana Paula  ")).toBe("ana paula");
  });

  it("trata cedilha e outros diacríticos", () => {
    expect(normalize("Engenheiro(a) — São Paulo")).toBe(
      "engenheiro(a) — sao paulo",
    );
  });

  it("string vazia permanece vazia", () => {
    expect(normalize("")).toBe("");
  });
});
