export type Money = { amountMinor: number; currency: "USD" };

export function money(amountMinor: number, currency: Money["currency"] = "USD"): Money {
  if (!Number.isSafeInteger(amountMinor) || amountMinor < 0) throw new Error("Money must use a non-negative safe integer in minor units.");
  return { amountMinor, currency };
}

export function addMoney(values: Money[]): Money {
  const currency = values[0]?.currency ?? "USD";
  if (values.some((value) => value.currency !== currency)) throw new Error("Currency conversion is not supported.");
  return money(values.reduce((total, value) => total + value.amountMinor, 0), currency);
}

export function formatMoney(value: Money, locale: "en" | "vi" = "en") {
  return new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US", { style: "currency", currency: value.currency }).format(value.amountMinor / 100);
}

