import { describe, expect, it } from "vitest";
import { leadSchema, leadTypeFromService } from "@/lib/lead";
import { parseLeadAttribution } from "@/lib/lead-tracking";
import { POST } from "@/app/api/leads/route";

const valid = { type:"buyer", locale:"en", contact:{fullName:"Sample Visitor",email:"visitor@example.com",phone:"",preferredLanguage:"en"}, serviceData:{targetArea:"Atlanta",budgetRange:"Exploring",timeline:"This year",firstTimeBuyer:"Yes",financingStatus:"Exploring options"}, message:"I would like to discuss a home purchase.", consent:true, website:"", completionTimeMs:5000, pagePath:"/en/book", attribution:{source:"direct",landingPage:"/en/book",currentPage:"/en/book",referrer:"",utmSource:"",utmMedium:"",utmCampaign:"",utmContent:"",utmTerm:""} };
describe("lead validation", () => {
  it("accepts a minimal privacy-conscious request", () => expect(leadSchema.safeParse(valid).success).toBe(true));
  it("rejects invalid email and missing consent", () => expect(leadSchema.safeParse({...valid,contact:{...valid.contact,email:"bad"},consent:false}).success).toBe(false));
  it("rejects the honeypot field", () => expect(leadSchema.safeParse({...valid,website:"spam"}).success).toBe(false));
  it("preselects supported query aliases", () => { expect(leadTypeFromService("real-estate")).toBe("buyer");expect(leadTypeFromService("spatial")).toBe("spatial-residential");expect(leadTypeFromService("unknown")).toBeNull() });
  it("parses UTM attribution without fingerprinting", () => {const result=parseLeadAttribution(new URLSearchParams("utm_source=youtube&utm_campaign=summer"),"/en/book");expect(result.source).toBe("youtube");expect(result.utmCampaign).toBe("summer")});
  it("accepts a successful mock submission", async () => {const response=await POST(new Request("http://localhost/api/leads",{method:"POST",headers:{"content-type":"application/json","x-forwarded-for":"test-success"},body:JSON.stringify(valid)}));expect(response.status).toBe(200);expect((await response.json()).ok).toBe(true)});
  it("rejects an invalid server submission", async () => {const response=await POST(new Request("http://localhost/api/leads",{method:"POST",headers:{"content-type":"application/json","x-forwarded-for":"test-invalid"},body:JSON.stringify({...valid,contact:{...valid.contact,email:"bad"}})}));expect(response.status).toBe(400)});
});
