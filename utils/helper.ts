export function setSlug(slug: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("slug", slug);
  }
}
