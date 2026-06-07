import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getRecipeBySlug, getAllRecipes } from "@/data/dramas";
import RecipeCard from "@/components/RecipeCard";
import AdSlot from "@/components/AdSlot";
import {
  Clock,
  ChefHat,
  ArrowLeft,
  Tv,
  Lightbulb,
  ShoppingCart,
  CheckSquare,
  Timer,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllRecipes().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getRecipeBySlug(slug);
  if (!result) return {};
  const { foodName, dramaName } = result;
  return {
    title: `${foodName} Recipe from ${dramaName}`,
    description: `Learn how to make authentic ${foodName} (${result.foodNameKorean}) as seen in ${dramaName}. Complete ingredients and step-by-step instructions.`,
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Recipe",
        name: foodName,
        description: result.description,
        cookTime: `PT${result.cookTime}M`,
        prepTime: `PT${result.prepTime}M`,
        totalTime: `PT${result.cookTime + result.prepTime}M`,
        recipeYield: "2-4 servings",
        recipeIngredient: result.ingredients.map((i) => `${i.amount} ${i.name}`),
        recipeInstructions: result.steps.map((s) => ({
          "@type": "HowToStep",
          name: s.title,
          text: s.description,
        })),
      }),
    },
  };
}

const DIFFICULTY_STYLES = {
  Easy: { color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30" },
  Medium: { color: "text-[#F5A623]", bg: "bg-[#F5A623]/10", border: "border-[#F5A623]/30" },
  Hard: { color: "text-[#E50914]", bg: "bg-[#E50914]/10", border: "border-[#E50914]/30" },
};

const FOOD_HERO_GRADIENTS = [
  "from-red-950 via-orange-950 to-[#0A0A0A]",
  "from-amber-950 via-yellow-950 to-[#0A0A0A]",
  "from-orange-950 via-red-950 to-[#0A0A0A]",
  "from-stone-900 via-amber-950 to-[#0A0A0A]",
  "from-red-900 via-rose-950 to-[#0A0A0A]",
];

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const result = getRecipeBySlug(slug);

  if (!result) notFound();

  const { drama, ...recipe } = result;
  const diff = DIFFICULTY_STYLES[recipe.difficulty];
  const slugKey = recipe.slug.replace(/^(cloy|bp|eaw|qot|mlfts|reply1988|startup)-?/, "");
  const heroImgSrc = `/api/og?slug=${slugKey}&name=${encodeURIComponent(recipe.foodName)}&korean=${encodeURIComponent(recipe.foodNameKorean)}&type=recipe`;

  const otherRecipes = drama.recipes
    .filter((r) => r.slug !== recipe.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* HERO */}
      <div className="relative min-h-[55vh] flex items-end overflow-hidden">
        <Image
          src={heroImgSrc}
          alt={recipe.foodName}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/20" />
        <div className="absolute inset-0 korean-pattern-bg opacity-10" />

        {/* Back button */}
        <div className="absolute top-6 left-4 z-20">
          <Link
            href={`/dramas/${recipe.dramaSlug}`}
            className="inline-flex items-center gap-2 text-[#B3B3B3] hover:text-white text-sm transition-colors glass px-3 py-1.5 rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" /> {recipe.dramaName}
          </Link>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-12 w-full">
          {/* Drama attribution badge */}
          <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-3 py-1.5 mb-4">
            <Tv className="w-3 h-3 text-[#E50914]" />
            <span className="text-[#E50914] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-heading)" }}>
              As seen in {recipe.dramaName}
            </span>
            {recipe.episode && (
              <span className="text-[#B3B3B3] text-xs">· {recipe.episode}</span>
            )}
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider uppercase text-white mb-2 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {recipe.foodName}
          </h1>

          <p className="text-[#F5A623] text-xl mb-4" style={{ fontFamily: "var(--font-korean)" }}>
            {recipe.foodNameKorean}
          </p>

          <p className="text-[#B3B3B3] max-w-2xl mb-6 leading-relaxed">{recipe.description}</p>

          {/* Meta row */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-[#B3B3B3]">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Prep: {recipe.prepTime}m</span>
            </div>
            <div className="flex items-center gap-2 text-[#B3B3B3]">
              <Timer className="w-4 h-4" />
              <span className="text-sm">Cook: {recipe.cookTime}m</span>
            </div>
            <div className="flex items-center gap-2 text-[#B3B3B3]">
              <Clock className="w-4 h-4 text-[#F5A623]" />
              <span className="text-sm font-bold text-white">Total: {recipe.prepTime + recipe.cookTime}m</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 border rounded-sm text-xs font-bold ${diff.color} ${diff.bg} ${diff.border}`}>
              <ChefHat className="w-3.5 h-3.5" />
              {recipe.difficulty}
            </div>
            <div className="text-[#B3B3B3] text-sm">
              {recipe.ingredients.length} ingredients · {recipe.steps.length} steps
            </div>
          </div>
        </div>
      </div>

      {/* Ad slot below hero */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <AdSlot slotId="recipe-top" />
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* INGREDIENTS */}
          <div>
            <h2
              className="text-2xl font-bold tracking-wider uppercase text-white mb-6 flex items-center gap-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <ShoppingCart className="w-5 h-5 text-[#E50914]" />
              Ingredients
            </h2>

            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-[#141414] border border-[#2A2A2A] p-4 hover:border-[#E50914]/30 transition-colors group"
                >
                  <CheckSquare className="w-4 h-4 text-[#B3B3B3] group-hover:text-[#E50914] mt-0.5 flex-shrink-0 transition-colors" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <span className="text-white text-sm font-medium">{ingredient.name}</span>
                      <span className="text-[#F5A623] text-sm font-bold flex-shrink-0">{ingredient.amount}</span>
                    </div>
                    {ingredient.substituteNote && (
                      <p className="text-[#B3B3B3] text-xs mt-0.5 italic">{ingredient.substituteNote}</p>
                    )}
                  </div>
                  {ingredient.amazonSearchTerm && (
                    <a
                      href={`https://www.amazon.com/s?k=${encodeURIComponent(ingredient.amazonSearchTerm)}&tag=kdramafood-20`}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-[#B3B3B3] hover:text-[#F5A623] text-xs flex-shrink-0 transition-colors"
                    >
                      Buy →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* STEPS */}
          <div>
            <h2
              className="text-2xl font-bold tracking-wider uppercase text-white mb-6 flex items-center gap-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <ChefHat className="w-5 h-5 text-[#E50914]" />
              Instructions
            </h2>

            <div className="space-y-4">
              {recipe.steps.map((step) => (
                <div
                  key={step.number}
                  className="bg-[#141414] border border-[#2A2A2A] p-5 hover:border-[#E50914]/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="text-3xl font-bold text-[#E50914]/30 leading-none flex-shrink-0 w-8"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                        <h3
                          className="text-white font-bold tracking-wide"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {step.title}
                        </h3>
                        {step.duration && (
                          <span className="flex items-center gap-1 text-[#F5A623] text-xs">
                            <Timer className="w-3 h-3" />
                            {step.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-[#B3B3B3] text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ad slot between ingredients/steps and bottom */}
        <div className="my-12">
          <AdSlot slotId="recipe-middle" />
        </div>

        {/* Drama Context + Fun Fact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#141414] border border-[#2A2A2A] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Tv className="w-4 h-4 text-[#E50914]" />
              <h3
                className="text-white font-bold tracking-wide uppercase text-sm"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                In the Drama
              </h3>
            </div>
            <p className="text-[#B3B3B3] text-sm leading-relaxed">{recipe.dramaContext}</p>
          </div>

          <div className="bg-[#141414] border border-[#F5A623]/20 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[#F5A623]" />
              <h3
                className="text-[#F5A623] font-bold tracking-wide uppercase text-sm"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Fun Fact
              </h3>
            </div>
            <p className="text-[#B3B3B3] text-sm leading-relaxed">{recipe.funFact}</p>
          </div>
        </div>

        {/* More recipes from drama */}
        {otherRecipes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold tracking-wider uppercase text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                More from {recipe.dramaName}
              </h2>
              <Link
                href={`/dramas/${recipe.dramaSlug}`}
                className="text-[#E50914] hover:text-white text-sm transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherRecipes.map((r) => (
                <RecipeCard key={r.slug} recipe={r} dramaName={recipe.dramaName} />
              ))}
            </div>
          </div>
        )}

        {/* Bottom ad slot */}
        <div className="mt-12">
          <AdSlot slotId="recipe-bottom" />
        </div>
      </div>
    </div>
  );
}
