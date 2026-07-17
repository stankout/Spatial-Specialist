export type AnalyticsEvent = "book_page_view"|"service_selected"|"lead_form_started"|"lead_form_submitted"|"lead_form_error"|"contact_click"|"phone_click"|"booking_external_click";
export function trackEvent(name:AnalyticsEvent, data:Record<string,string> = {}) { if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("spatial:analytics", { detail:{name,data} })); }
