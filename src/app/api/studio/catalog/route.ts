import { NextResponse } from "next/server";
import { z } from "zod";
import type { Capability } from "@/lib/governance/permissions";
import { catalogItemSchema } from "@/lib/catalog/types";
import { LocalCatalogRepository } from "@/lib/catalog/repository";
import { getStudioAccess } from "@/lib/media/security";

export const runtime = "nodejs";
const repository = new LocalCatalogRepository();
function denied(capability: Capability) { const access = getStudioAccess(undefined, capability); return NextResponse.json({ ok: false, error: access.reason }, { status: access.actor ? 403 : 401 }); }
export async function GET() { if (!getStudioAccess(undefined, "catalog.read").enabled) return denied("catalog.read"); return NextResponse.json({ ok: true, items: await repository.list() }); }
export async function POST(request: Request) {
  try {
    const { item } = z.object({ item: catalogItemSchema }).parse(await request.json());
    const capability: Capability = item.status === "active" ? "catalog.publish" : "catalog.edit";
    if (!getStudioAccess(undefined, capability).writable) return denied(capability);
    return NextResponse.json({ ok: true, item: await repository.save(item) });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Catalog operation failed." }, { status: 400 });
  }
}
