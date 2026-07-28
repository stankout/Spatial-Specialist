import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getStudioAccess } from "@/lib/media/security";
import { publishSocialDraft, readSocialStore, saveSocialDraft } from "@/lib/social/repository";
import { socialChannelListSchema } from "@/lib/social/types";

export const runtime = "nodejs";
const requestSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("save-draft"), channels: socialChannelListSchema }).strict(),
  z.object({ action: z.literal("publish") }).strict(),
]);

export async function GET() {
  const access = getStudioAccess(undefined, "social.read");
  if (!access.enabled) return NextResponse.json({ ok: false, error: access.reason }, { status: access.actor ? 403 : 401 });
  return NextResponse.json({ ok: true, store: await readSocialStore() });
}

export async function POST(request: Request) {
  try {
    const body = requestSchema.parse(await request.json());
    const capability = body.action === "publish" ? "social.publish" : "social.edit";
    const access = getStudioAccess(undefined, capability);
    if (!access.writable) return NextResponse.json({ ok: false, error: access.reason }, { status: access.actor ? 403 : 401 });
    const store = body.action === "publish"
      ? await publishSocialDraft(access.actor)
      : await saveSocialDraft(body.channels, access.actor);
    if (body.action === "publish") revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, store });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Social channel update failed." }, { status: 400 });
  }
}

