"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { dramas, getAllRecipes } from "@/data/dramas";
import RecipeCard from "@/components/RecipeCard";
import DramaCard from "@/components/DramaCard";
import { Search, Sparkles, Loader2, ChefHat } from "lucide-react";
import type { GenerateRecipeResponse } from "@/types";

function SearchPageInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialDrama = searchParams.get("drama") || "";

  const [query, setQuery] = useState(initialQuery);
  const [dramaName, setDramaName] = useState(initialDrama);
  const [sceneDesc, setSceneDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiRecipe, setAiRecipe] = useState<GenerateRecipeResponse | null>(null);
  const [error, setError] = useState("");

  const allRecipes = useMemo(() => getAllRecipes(), []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return allRecipes.slice(0, 12);
    const q = query.toLowerCase();
    return allRecipes.filter(
      (r) =>
        r.foodName.toLowerCase().includes(q) ||
        r.foodNameKorean.toLowerCase().includes(q) ||
        r.dramaName.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.name.toLowerCase().includes(q))
    );
  }, [query, allRecipes]);

  const dramaResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return dramas.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.genre.some((g) => g.toLowerCase().includes(q))
    );
  }, [query]);

  async function handleGenerateRecipe(e: React.FormEvent) {
    e.preventDefault();
    if (!sceneDesc.trim()) return;
    setLoading(true);
    setError("");
    setAiRecipe(null);

    try {
      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dramaName: dramaName || "Unknown K-Drama",
          sceneDescription: sceneDesc,
        }),
      });
      if (!res.ok) throw new Error("Failed to generate recipe");
      const data = await res.json();
      setAiRecipe(data);
    } catch {
      setError("Failed to generate recipe. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  }

  const DIFFICULTY_COLORS = {
    Easy: "text-green-400 bg-green-400/10 border-green-400/30",
    Medium: "text-[#F5A623] bg-[#F5A623]/10 border-[#F5A623]/30",
    Hard: "text-[#E50914] bg-[#E50914]/10 border-[#E50914]/30",
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#141414] to-[#0A0A0A] border-b border-[#2A2A2A] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-wider uppercase text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Search Recipes
          </h1>
          <p className="text-[#B3B3B3] mb-8">Find any dish from your favorite K-dramas</p>

          {/* Search bar */}
          <div className="relative flex items-center bg-[#141414] border border-[#2A2A2A] focus-within:border-[#E50914] transition-colors rounded-sm overflow-hidden">
            <Search className="w-5 h-5 text-[#B3B3B3] ml-4 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes, dramas, or ingredients..."
              className="flex-1 bg-transparent px-4 py-4 text-white placeholder-[#B3B3B3]/50 outline-none text-sm"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="px-4 text-[#B3B3B3] hover:text-white text-sm transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search results */}
        {dramaResults.length > 0 && (
          <div className="mb-10">
            <h2
              className="text-xl font-bold tracking-wider uppercase text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Matching Dramas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {dramaResults.map((drama) => (
                <DramaCard key={drama.slug} drama={drama} />
              ))}
            </div>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="mb-12">
            <h2
              className="text-xl font-bold tracking-wider uppercase text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {query ? `${searchResults.length} Recipes Found` : "All Recipes"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {searchResults.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        {query && searchResults.length === 0 && dramaResults.length === 0 && (
          <div className="text-center py-12 mb-12">
            <p className="text-[#B3B3B3] mb-2">No results found for &quot;{query}&quot;</p>
            <p className="text-[#B3B3B3]/60 text-sm">Try the AI recipe generator below!</p>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-[#2A2A2A] mb-12" />

        {/* AI RECIPE GENERATOR */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/20 text-[#E50914] text-xs tracking-widest uppercase px-4 py-2 mb-4">
              <Sparkles className="w-3 h-3" />
              AI Powered
            </div>
            <h2
              className="text-3xl font-bold tracking-wider uppercase text-white mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Generate a Recipe
            </h2>
            <p className="text-[#B3B3B3] text-sm">
              Describe a food scene from any K-drama and our AI will identify the dish and create a full recipe.
            </p>
          </div>

          <form onSubmit={handleGenerateRecipe} className="space-y-4">
            <div>
              <label className="block text-[#B3B3B3] text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Drama Name (optional)
              </label>
              <input
                type="text"
                value={dramaName}
                onChange={(e) => setDramaName(e.target.value)}
                placeholder="e.g. Crash Landing on You"
                className="w-full bg-[#141414] border border-[#2A2A2A] focus:border-[#E50914] outline-none px-4 py-3 text-white placeholder-[#B3B3B3]/50 text-sm transition-colors rounded-sm"
              />
            </div>

            <div>
              <label className="block text-[#B3B3B3] text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Scene Description *
              </label>
              <textarea
                value={sceneDesc}
                onChange={(e) => setSceneDesc(e.target.value)}
                placeholder="e.g. The scene where the soldiers cook noodles in the barracks for the South Korean woman..."
                rows={4}
                required
                className="w-full bg-[#141414] border border-[#2A2A2A] focus:border-[#E50914] outline-none px-4 py-3 text-white placeholder-[#B3B3B3]/50 text-sm transition-colors resize-none rounded-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !sceneDesc.trim()}
              className="w-full flex items-center justify-center gap-3 bg-[#E50914] hover:bg-[#C1050F] disabled:bg-[#E50914]/30 disabled:cursor-not-allowed text-white py-4 transition-all hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] disabled:shadow-none"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.1em" }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Recipe...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Recipe
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-[#E50914]/10 border border-[#E50914]/30 p-4 text-[#E50914] text-sm rounded-sm">
              {error}
            </div>
          )}

          {/* AI Recipe Result */}
          {aiRecipe && (
            <div className="mt-8 bg-[#141414] border border-[#2A2A2A] rounded-sm overflow-hidden animate-slide-up">
              <div className="bg-gradient-to-r from-[#E50914]/10 to-transparent border-b border-[#2A2A2A] p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#E50914]" />
                  <span className="text-[#E50914] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                    AI Generated Recipe
                  </span>
                </div>
                <h3
                  className="text-3xl font-bold tracking-wider uppercase text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {aiRecipe.foodName}
                </h3>
                <p className="text-[#F5A623] text-lg mt-1" style={{ fontFamily: "var(--font-korean)" }}>
                  {aiRecipe.foodNameKorean}
                </p>
                <p className="text-[#B3B3B3] text-sm mt-2">{aiRecipe.description}</p>

                <div className="flex items-center gap-4 mt-4 flex-wrap">
                  <span className="text-[#B3B3B3] text-xs">Prep: {aiRecipe.prepTime}m</span>
                  <span className="text-[#B3B3B3] text-xs">Cook: {aiRecipe.cookTime}m</span>
                  <span className={`text-xs px-2 py-0.5 border rounded-sm ${DIFFICULTY_COLORS[aiRecipe.difficulty]}`}>
                    {aiRecipe.difficulty}
                  </span>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Ingredients */}
                <div>
                  <h4
                    className="text-white font-bold tracking-wide uppercase mb-4 text-sm"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Ingredients
                  </h4>
                  <ul className="space-y-2">
                    {aiRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-[#E50914] flex-shrink-0 mt-0.5">•</span>
                        <span className="text-[#B3B3B3]">
                          <span className="text-[#F5A623] font-medium">{ing.amount}</span> {ing.name}
                          {ing.amazonSearchTerm && (
                            <a
                              href={`https://www.amazon.com/s?k=${encodeURIComponent(ing.amazonSearchTerm)}&tag=kdramafood-20`}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="ml-2 text-[#B3B3B3]/60 hover:text-[#F5A623] text-xs transition-colors"
                            >
                              Buy →
                            </a>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div>
                  <h4
                    className="text-white font-bold tracking-wide uppercase mb-4 text-sm"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Instructions
                  </h4>
                  <ol className="space-y-3">
                    {aiRecipe.steps.map((step) => (
                      <li key={step.number} className="flex gap-3 text-sm">
                        <span
                          className="text-[#E50914]/60 font-bold text-lg leading-none flex-shrink-0 w-6"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {step.number}
                        </span>
                        <div>
                          <p className="text-white font-medium mb-0.5">{step.title}</p>
                          <p className="text-[#B3B3B3]">{step.description}</p>
                          {step.duration && (
                            <span className="text-[#F5A623] text-xs">{step.duration}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Fun fact and context */}
              <div className="border-t border-[#2A2A2A] p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiRecipe.dramaContext && (
                  <div>
                    <p className="text-[#B3B3B3]/60 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-heading)" }}>In the Drama</p>
                    <p className="text-[#B3B3B3] text-sm">{aiRecipe.dramaContext}</p>
                  </div>
                )}
                {aiRecipe.funFact && (
                  <div>
                    <p className="text-[#F5A623]/60 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-heading)" }}>Fun Fact</p>
                    <p className="text-[#B3B3B3] text-sm">{aiRecipe.funFact}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Browse dramas CTA */}
        <div className="mt-16 text-center border-t border-[#2A2A2A] pt-12">
          <ChefHat className="w-8 h-8 text-[#E50914] mx-auto mb-4" />
          <h3
            className="text-2xl font-bold tracking-wider uppercase text-white mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Browse by Drama
          </h3>
          <p className="text-[#B3B3B3] mb-6">Explore all recipes organized by your favorite shows</p>
          <Link
            href="/dramas"
            className="inline-flex items-center gap-2 bg-[#141414] border border-[#2A2A2A] hover:border-[#E50914] text-white px-6 py-3 transition-colors"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.1em" }}
          >
            View All Dramas →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <SearchPageInner />
    </Suspense>
  );
}
