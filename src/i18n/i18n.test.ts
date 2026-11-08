import { describe, expect, it } from "vitest";
import { fr } from "./fr";
import { en } from "./en";

// Liste récursivement les chemins de clés (les tableaux gardent leur longueur)
function paths(o: unknown, prefix = ""): string[] {
  if (Array.isArray(o)) return [`${prefix}[${o.length}]`, ...o.flatMap((v, i) => paths(v, `${prefix}[${i}]`))];
  if (o && typeof o === "object")
    return Object.entries(o).flatMap(([k, v]) => paths(v, prefix ? `${prefix}.${k}` : k));
  return [prefix];
}

describe("i18n", () => {
  it("FR et EN ont exactement la même structure", () => {
    expect(paths(en).sort()).toEqual(paths(fr).sort());
  });

  it("aucune traduction vide", () => {
    const empty = (o: unknown): boolean =>
      typeof o === "string" ? o.trim() === "" : Object.values(o as object).some(empty);
    expect(empty(fr)).toBe(false);
    expect(empty(en)).toBe(false);
  });
});
