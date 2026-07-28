"use client";
import { useRef, useState } from "react";
import { clearBrowserCart, readBrowserCart } from "@/components/cart-client";

export function CheckoutClient({ locale }: { locale: "en" | "vi" }) {
  const vi = locale === "vi";
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const idempotencyKey = useRef<string | null>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    idempotencyKey.current ??= crypto.randomUUID();
    setBusy(true);
    setStatus(vi ? "Đang tạo phiên thanh toán thử nghiệm…" : "Creating development checkout…");
    const form = new FormData(event.currentTarget);
    const result = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ idempotencyKey: idempotencyKey.current, locale, contact: { name: String(form.get("name")), email: String(form.get("email")) }, cart: readBrowserCart(), attribution: {}, website: String(form.get("website") ?? "") }) }).then((response) => response.json());
    setBusy(false);
    setStatus(result.ok ? `${vi ? "Đã tạo đơn thử nghiệm" : "Development order created"}: ${result.orderId}` : result.error);
    if (result.ok) clearBrowserCart();
  }
  return <form className="checkout-form" onSubmit={submit}><div className="development-banner">DEVELOPMENT / MOCK · No real payment is collected.</div><label>{vi ? "Họ và tên" : "Full name"}<input name="name" required minLength={2}/></label><label>Email<input name="email" type="email" required/></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label><button disabled={busy} className="button button-dark">{busy ? (vi ? "Đang xử lý…" : "Processing…") : (vi ? "Tạo checkout thử nghiệm" : "Create development checkout")}</button><output aria-live="polite">{status}</output></form>;
}
