import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import type { Capability } from "@/lib/governance/permissions";
import { getStudioAccess } from "@/lib/media/security";
import { applyVisualPreset, resetVisualPage, resetVisualSection, visualConfigSchema, visualPageKeySchema, visualPresets } from "@/lib/visuals/config";
import { publishVisualDraft, readVisualStore, resetVisualDraft, saveVisualDraft } from "@/lib/visuals/storage";

const presetSchema = z.enum(Object.keys(visualPresets) as [keyof typeof visualPresets, ...Array<keyof typeof visualPresets>]);
const actionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("save-draft"), config: visualConfigSchema }).strict(),
  z.object({ action: z.literal("publish"), config: visualConfigSchema }).strict(),
  z.object({ action: z.literal("reset-all"), confirmation: z.literal("RESET VISUALS") }).strict(),
  z.object({ action: z.literal("reset-page"), page: visualPageKeySchema }).strict(),
  z.object({ action: z.literal("reset-section"), page: visualPageKeySchema, section: z.string().min(1).max(64).regex(/^[a-z][a-z0-9-]*$/) }).strict(),
  z.object({ action: z.literal("apply-preset"), page: visualPageKeySchema, preset: presetSchema }).strict(),
]);

function denied(capability: Capability) { const access = getStudioAccess(undefined, capability); return NextResponse.json({ ok: false, error: access.reason }, { status: access.actor ? 403 : 401 }); }
export async function GET() { if (!getStudioAccess(undefined, "visuals.read").enabled) return denied("visuals.read"); return NextResponse.json({ ok: true, ...await readVisualStore() }); }

export async function POST(request: Request) {
  try {
    const body = actionSchema.parse(await request.json());
    const capability: Capability = body.action === "publish" ? "visuals.publish" : body.action === "reset-all" ? "developer.manage" : "visuals.edit";
    if (!getStudioAccess(undefined, capability).writable) return denied(capability);
    if (body.action === "save-draft") return NextResponse.json({ ok: true, ...await saveVisualDraft(body.config) });
    if (body.action === "publish") { const store = await publishVisualDraft(body.config); revalidatePath("/", "layout"); return NextResponse.json({ ok: true, ...store }); }
    if (body.action === "reset-all") return NextResponse.json({ ok: true, ...await resetVisualDraft() });
    const store = await readVisualStore();
    const draft = body.action === "reset-page" ? resetVisualPage(store.draft, body.page) : body.action === "reset-section" ? resetVisualSection(store.draft, body.page, body.section) : applyVisualPreset(store.draft, body.page, body.preset);
    return NextResponse.json({ ok: true, ...await saveVisualDraft(draft) });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Visual configuration update failed." }, { status: 400 });
  }
}
