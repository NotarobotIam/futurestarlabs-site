import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { SUBJECTS } from "@/content/subjects";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/company", "/bactesign", ...SUBJECTS.map((s) => `/subjects/${s.slug}`)];
  return paths.map((p) => ({
    url: new URL(p, SITE_URL).toString(),
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
