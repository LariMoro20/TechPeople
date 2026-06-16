import { describe, expect, it } from "vitest";
import { formatCurrency } from "../../app/utils/currency";

describe("formatCurrency", () => {
  it("formata valores inteiros em BRL", () => {
    expect(formatCurrency(150)).toBe("R$ 150");
  });

  it("não exibe casas decimais", () => {
    expect(formatCurrency(99.9)).toBe("R$ 100");
  });

  it("formata zero corretamente", () => {
    expect(formatCurrency(0)).toBe("R$ 0");
  });

  it("formata valores grandes com separador de milhar", () => {
    expect(formatCurrency(12000)).toBe("R$ 12.000");
  });
});
