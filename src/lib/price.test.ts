import { describe, expect, it } from "vitest";
import { formatPrice } from "./price";

describe("formatPrice", () => {
  it("shows lira amount", () => expect(formatPrice(240)).toBe("₺240"));
  it("shows placeholder when price unknown", () => expect(formatPrice(undefined)).toBe("₺ --"));
});
