const reservedSlugs = new Set(["studio", "api", "checkout", "account", "cart", "search", "_next"]);
export const safeSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validatePublicSlug(slug: string) {
  if (!safeSlugPattern.test(slug)) return { valid: false, reason: "Use lowercase letters, numbers, and single hyphens only." } as const;
  if (reservedSlugs.has(slug)) return { valid: false, reason: "This slug is reserved by the platform." } as const;
  return { valid: true, reason: null } as const;
}

