import { NextResponse } from "next/server";
import { z } from "zod";
import type { Capability } from "@/lib/governance/permissions";
import { getStudioAccess } from "@/lib/media/security";
import { LocalPageRepository } from "@/lib/page-manager/repository";
import { managedPageSchema } from "@/lib/page-manager/types";

export const runtime = "nodejs";
const repository = new LocalPageRepository();
function denied(capability: Capability) { const access = getStudioAccess(undefined, capability); return NextResponse.json({ ok: false, error: access.reason }, { status: access.actor ? 403 : 401 }); }
export async function GET() { if (!getStudioAccess(undefined, "pages.read").enabled) return denied("pages.read"); return NextResponse.json({ ok: true, pages: await repository.list() }); }
export async function PATCH(request: Request) {
  try {
    const { page } = z.object({ page: managedPageSchema }).parse(await request.json());
    const capability: Capability = page.status === "published" ? "pages.publish" : "pages.edit";
    if (!getStudioAccess(undefined, capability).writable) return denied(capability);
    return NextResponse.json({ ok: true, page: await repository.save(page) });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Page operation failed." }, { status: 400 });
  }
}
