import { NextResponse } from "next/server";
import { z } from "zod";
import { catalogItemSchema } from "@/lib/catalog/types";
import { LocalCatalogRepository } from "@/lib/catalog/repository";
import { getStudioAccess } from "@/lib/media/security";
export const runtime = "nodejs";
const repository = new LocalCatalogRepository();
export async function GET() { const access = getStudioAccess(); if (!access.enabled) return NextResponse.json({ ok: false, error: access.reason }, { status: 403 }); return NextResponse.json({ ok: true, items: await repository.list() }); }
export async function POST(request: Request) { const access = getStudioAccess(); if (!access.writable) return NextResponse.json({ ok: false, error: access.reason }, { status: 403 }); try { const { item } = z.object({ item: catalogItemSchema }).parse(await request.json()); return NextResponse.json({ ok: true, item: await repository.save(item) }); } catch (error) { return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Catalog operation failed." }, { status: 400 }); } }
