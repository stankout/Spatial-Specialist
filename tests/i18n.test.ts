import { describe, expect, it } from "vitest";
import { getDictionary, isLocale, localizedPath } from "@/lib/i18n";

describe("language routes", () => {
  it("accepts only supported locales", () => { expect(isLocale("en")).toBe(true); expect(isLocale("vi")).toBe(true); expect(isLocale("fr")).toBe(false); });
  it("creates stable localized paths", () => { expect(localizedPath("en", "/book")).toBe("/en/book"); expect(localizedPath("vi", "/")).toBe("/vi"); });
  it("maintains core bilingual navigation parity", () => { expect(Object.keys(getDictionary("en").nav)).toEqual(Object.keys(getDictionary("vi").nav)); });
});
