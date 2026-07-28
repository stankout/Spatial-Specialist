import { z } from "zod";
import { publicationStatusSchema } from "@/lib/platform/publishing";

export const lessonSchema = z.object({ id: z.string(), title: z.string().max(250), type: z.enum(["text", "video", "audio", "embed", "download"]), content: z.string().max(20_000).default(""), assetId: z.string().nullable().default(null), embedId: z.string().nullable().default(null), preview: z.boolean().default(false) });
export const courseModuleSchema = z.object({ id: z.string(), title: z.string().max(250), lessons: lessonSchema.array().max(100) });
export const courseSchema = z.object({ id: z.string(), catalogItemId: z.string(), status: publicationStatusSchema, access: z.enum(["free", "paid"]), modules: courseModuleSchema.array().max(100), updatedAt: z.string() });
export type Course = z.infer<typeof courseSchema>;

