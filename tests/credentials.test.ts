import { describe, expect, it } from "vitest";
import { activeCredentials, credentials } from "@/data/credentials.config";

describe("credential feature flags", () => {
  it("hides every unverified credential by default", () => {
    expect(credentials.realEstate.licenseActive).toBe(false);
    expect(credentials.homeInspection.cpiActive).toBe(false);
    expect(activeCredentials()).toEqual([]);
  });
});
