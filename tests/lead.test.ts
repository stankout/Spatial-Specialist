import { describe, expect, it } from "vitest";
import { leadSchema } from "@/lib/lead";

const valid = { type:"buyer", name:"Sample Visitor", email:"visitor@example.com", preferredLanguage:"en", message:"I would like to discuss a home purchase.", consent:true, source:"direct" };
describe("lead validation", () => {
  it("accepts a minimal privacy-conscious request", () => expect(leadSchema.safeParse(valid).success).toBe(true));
  it("rejects invalid email and missing consent", () => expect(leadSchema.safeParse({...valid,email:"bad",consent:false}).success).toBe(false));
  it("rejects the honeypot field", () => expect(leadSchema.safeParse({...valid,website:"spam"}).success).toBe(false));
});
