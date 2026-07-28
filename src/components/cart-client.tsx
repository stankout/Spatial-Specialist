"use client";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { emptyCart, cartSchema, cartSubtotalMinor, type Cart } from "@/lib/cart/types";
import { formatMoney, money } from "@/lib/platform/money";
const storageKey = "ac-platform-cart-v1";
const emptySerialized=JSON.stringify(emptyCart());
function subscribeCart(callback:()=>void){window.addEventListener("storage",callback);window.addEventListener("ac:cart",callback);return()=>{window.removeEventListener("storage",callback);window.removeEventListener("ac:cart",callback)}}
function writeCart(cart:Cart){localStorage.setItem(storageKey,JSON.stringify(cart));window.dispatchEvent(new Event("ac:cart"))}
function parseSerializedCart(value:string){try{const parsed=cartSchema.safeParse(JSON.parse(value));return parsed.success?parsed.data:emptyCart()}catch{return emptyCart()}}

export function AddToCartButton({ item, locale }: { item: { id: string; title: string; priceMinor: number; type: "physical" | "digital" }; locale: "en" | "vi" }) {
  const [message, setMessage] = useState("");
  function add() { const parsed = cartSchema.safeParse(JSON.parse(localStorage.getItem(storageKey) ?? "null")); const cart = parsed.success ? parsed.data : emptyCart(); const current = cart.lines.find((line) => line.itemId === item.id && !line.variantId); const next: Cart = { ...cart, lines: [...cart.lines.filter((line) => line.itemId !== item.id || line.variantId), { itemId: item.id, variantId: null, type: item.type, title: item.title, unitPriceMinor: item.priceMinor, quantity: Math.min(99, (current?.quantity ?? 0) + 1) }] }; writeCart(next); setMessage(locale === "vi" ? "Đã thêm vào giỏ." : "Added to cart."); }
  return <div><button className="button button-accent" onClick={add}>{locale === "vi" ? "Thêm vào giỏ" : "Add to cart"}</button><output aria-live="polite">{message}</output></div>;
}

export function CartClient({ locale }: { locale: "en" | "vi" }) {
  const serialized=useSyncExternalStore(subscribeCart,()=>localStorage.getItem(storageKey)??emptySerialized,()=>emptySerialized);
  const cart=parseSerializedCart(serialized);
  function update(next: Cart) { writeCart(next); }
  return <section className="cart-workspace">{cart.lines.map((line) => <article key={`${line.itemId}:${line.variantId ?? ""}`}><div><strong>{line.title}</strong><span>{formatMoney(money(line.unitPriceMinor), locale)}</span></div><label>{locale === "vi" ? "Số lượng" : "Quantity"}<input type="number" min="1" max="99" value={line.quantity} onChange={(event) => update({ ...cart, lines: cart.lines.map((item) => item === line ? { ...item, quantity: Math.max(1, Math.min(99, Number(event.target.value))) } : item) })}/></label><button onClick={() => update({ ...cart, lines: cart.lines.filter((item) => item !== line) })}>{locale === "vi" ? "Xóa" : "Remove"}</button></article>)}{cart.lines.length === 0 ? <div className="studio-empty"><h2>{locale === "vi" ? "Giỏ hàng đang trống." : "Your cart is empty."}</h2></div> : <footer><strong>{locale === "vi" ? "Tạm tính" : "Subtotal"}</strong><b>{formatMoney(money(cartSubtotalMinor(cart)), locale)}</b><Link className="button button-dark" href={`/${locale}/checkout`}>{locale === "vi" ? "Tiếp tục thanh toán" : "Continue to checkout"}</Link></footer>}</section>;
}

export function readBrowserCart() { try { const parsed = cartSchema.safeParse(JSON.parse(localStorage.getItem(storageKey) ?? "null")); return parsed.success ? parsed.data : emptyCart(); } catch { return emptyCart(); } }
export function clearBrowserCart() { localStorage.removeItem(storageKey); }
