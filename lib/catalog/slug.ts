export function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

export function createUniqueSlug(title: string, existingSlugs: string[]) {
  const baseSlug = createSlug(title) || "obra";
  let slug = baseSlug;
  let suffix = 2;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}
