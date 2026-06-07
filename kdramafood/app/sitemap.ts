import type { MetadataRoute } from "next";
import { dramas, getAllRecipes } from "@/data/dramas";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kdramafood.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/dramas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const dramaRoutes: MetadataRoute.Sitemap = dramas.map((drama) => ({
    url: `${baseUrl}/dramas/${drama.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const recipeRoutes: MetadataRoute.Sitemap = getAllRecipes().map((recipe) => ({
    url: `${baseUrl}/recipes/${recipe.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dramaRoutes, ...recipeRoutes];
}
