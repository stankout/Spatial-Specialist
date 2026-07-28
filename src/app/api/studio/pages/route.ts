import { NextResponse } from "next/server";
import { z } from "zod";
import { getStudioAccess } from "@/lib/media/security";
import { LocalPageRepository } from "@/lib/page-manager/repository";
import { managedPageSchema } from "@/lib/page-manager/types";
export const runtime = "nodejs";
const repository = new LocalPageRepository();
export async function GET() { const access = getStudioAccess(); if (!access.enabled) return NextResponse.json({ ok: false, error: access.reason }, { status: 403 }); return NextResponse.json({ ok: true, pages: await repository.list() }); }
export async function PATCH(request: Request) { const access = getStudioAccess(); if (!access.writable) return NextResponse.json({ ok: false, error: access.reason }, { status: 403 }); try { const { page } = z.object({ page: managedPageSchema }).parse(await request.json()); return NextResponse.json({ ok: true, page: await repository.save(page) }); } catch (error) { return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Page operation failed." }, { status: 400 }); } }

