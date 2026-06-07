import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getRecipeBySlug, getAllRecipes } from "@/data/dramas";
import RecipeCard from "@/components/RecipeCard";
import AdSlot from "@/components/AdSlot";
import {
  Clock, ChefHat, ArrowLeft, Tv, Lightbulb,
  ShoppingCart, CheckSquare, Timer, Play, MessageCircle, ExternalLink,
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
  };
}

const DIFFICULTY_STYLES = {
  Easy: { color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30" },
  Medium: { color: "text-[#F5A623]", bg: "bg-[#F5A623]/10", border: "border-[#F5A623]/30" },
  Hard: { color: "text-[#E50914]", bg: "bg-[#E50914]/10", border: "border-[#E50914]/30" },
};

const VIEWER_REACTIONS: Record<string, { user: string; flag: string; comment: string; likes: number }[]> = {
  default: [
    { user: "kdrama_foodie", flag: "🇺🇸", comment: "I paused the episode immediately and started Googling. Finally a proper recipe!", likes: 847 },
    { user: "seoulkitchen", flag: "🇬🇧", comment: "Made this for my watch party and everyone lost their minds. 10/10 would recommend!", likes: 612 },
    { user: "ramyeonqueen", flag: "🇦🇺", comment: "The drama hit different after I actually tasted this. The characters' reactions make SO much sense now 😭", likes: 1204 },
    { user: "oppa_cooking", flag: "🇨🇦", comment: "Third time making this. My Korean friend said it tastes authentic and I cried happy tears.", likes: 389 },
  ],
};

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const result = getRecipeBySlug(slug);
  if (!result) notFound();

  const { drama, ...recipe } = result;
  const diff = DIFFICULTY_STYLES[recipe.difficulty];
  const slugKey = recipe.slug.replace(/^(cloy|bp|eaw|qot|mlfts|reply1988|startup)-?/, "");
  const foodImgSrc = `/api/og?slug=${slugKey}&name=${encodeURIComponent(recipe.foodName)}&korean=${encodeURIComponent(recipe.foodNameKorean)}&type=recipe`;
  const dramaImgSrc = `/api/og?slug=${recipe.dramaSlug}&name=${encodeURIComponent(recipe.dramaName)}&type=drama`;
  const reactions = VIEWER_REACTIONS[recipe.slug] || VIEWER_REACTIONS.default;
  const ytQuery = encodeURIComponent(`${recipe.foodName} Korean recipe ${recipe.foodNameKorean}`);
  const otherRecipes = drama.recipes.filter((r) => r.slug !== recipe.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">

      {/* ── HERO ── */}
      <div className="relative min-h-[75vh] flex items-end overflow-hidden">
        {/* Background: food image blurred */}
        <Image src={foodImgSrc} alt={recipe.foodName} fill className="object-cover scale-110 blur-sm" unoptimized priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/50" />

        {/* Back button */}
        <div className="absolute top-6 left-4 z-20">
          <Link href={`/dramas/${recipe.dramaSlug}`}
            className="inline-flex items-center gap-2 text-[#B3B3B3] hover:text-white text-sm transition-colors glass px-3 py-2 rounded-sm">
            <ArrowLeft className="w-4 h-4" /> {recipe.dramaName}
          </Link>
        </div>

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          {/* LEFT: Text content */}
          <div>
            {/* Drama badge — BIG */}
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-[#E50914] px-3 py-1">
                <span className="text-white text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                  As seen in
                </span>
              </div>
              <span className="text-white text-lg font-bold tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                {recipe.dramaName}
              </span>
              {recipe.episode && (
                <span className="text-[#B3B3B3] text-sm border border-[#2A2A2A] px-2 py-0.5">{recipe.episode}</span>
              )}
            </div>

            {/* Food name — HUGE */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold tracking-wider uppercase text-white leading-none mb-3"
              style={{ fontFamily: "var(--font-heading)" }}>
              {recipe.foodName}
            </h1>
            <p className="text-[#F5A623] text-2xl mb-4" style={{ fontFamily: "var(--font-korean)" }}>
              {recipe.foodNameKorean}
            </p>
            <p className="text-[#B3B3B3] text-base leading-relaxed mb-6 max-w-xl">{recipe.description}</p>

            {/* Stats bar */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-[#141414] border border-[#2A2A2A] px-4 py-2">
                <Clock className="w-4 h-4 text-[#B3B3B3]" />
                <span className="text-[#B3B3B3] text-sm">Prep <span className="text-white font-bold">{recipe.prepTime}m</span></span>
              </div>
              <div className="flex items-center gap-2 bg-[#141414] border border-[#2A2A2A] px-4 py-2">
                <Timer className="w-4 h-4 text-[#F5A623]" />
                <span className="text-[#B3B3B3] text-sm">Cook <span className="text-white font-bold">{recipe.cookTime}m</span></span>
              </div>
              <div className="flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-4 py-2">
                <Clock className="w-4 h-4 text-[#E50914]" />
                <span className="text-[#E50914] text-sm font-bold">Total {recipe.prepTime + recipe.cookTime}m</span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 border text-sm font-bold ${diff.color} ${diff.bg} ${diff.border}`}>
                <ChefHat className="w-4 h-4" />
                {recipe.difficulty}
              </div>
            </div>
          </div>

          {/* RIGHT: Drama scene card — 드라마 속 음식장면 */}
          <div className="hidden lg:flex justify-end">
            <div className="relative w-80 h-96 xl:w-96 xl:h-[28rem] rounded-sm overflow-hidden border border-[#E50914]/30 shadow-[0_0_60px_rgba(229,9,20,0.35)]">
              <Image src={dramaImgSrc} alt={recipe.dramaName} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[#E50914] text-[10px] tracking-widest uppercase font-bold mb-1" style={{ fontFamily: "var(--font-heading)" }}>드라마 속 음식장면</p>
                <p className="text-white text-sm font-bold tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>{recipe.episode || recipe.dramaName}</p>
                <p className="text-[#B3B3B3] text-xs mt-1 leading-snug line-clamp-2">{recipe.dramaContext}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DRAMA SCENE SPOTLIGHT ── */}
      <div className="bg-[#0D0D0D] border-y border-[#2A2A2A]">
        <div className="max-w-screen-2xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Drama poster */}
          <div className="relative h-64 rounded-sm overflow-hidden border border-[#2A2A2A]">
            <Image src={dramaImgSrc} alt={recipe.dramaName} fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="text-white text-xs bg-[#E50914] px-2 py-0.5 font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                {recipe.episode || recipe.dramaName}
              </span>
            </div>
          </div>

          {/* Scene description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Tv className="w-5 h-5 text-[#E50914]" />
              <h2 className="text-xl font-bold tracking-wider uppercase text-white" style={{ fontFamily: "var(--font-heading)" }}>
                The Scene
              </h2>
            </div>
            <p className="text-[#B3B3B3] text-base leading-relaxed mb-4">{recipe.dramaContext}</p>
            <div className="bg-[#141414] border-l-4 border-[#E50914] p-4">
              <p className="text-[#B3B3B3] text-sm italic leading-relaxed">
                &ldquo;{recipe.funFact}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <Lightbulb className="w-4 h-4 text-[#F5A623]" />
              <span className="text-[#F5A623] text-xs tracking-widest uppercase font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                Korean Food Fact
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── AD ── */}
      <div className="max-w-screen-2xl mx-auto px-4 py-6">
        <AdSlot slotId="recipe-top" />
      </div>

      {/* ── 완성된 요리 사진 + 재료 (가로 나란히) ── */}
      <div className="max-w-screen-2xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT: 완성된 요리 사진 */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] rounded-sm overflow-hidden border border-[#2A2A2A]">
            <Image src={foodImgSrc} alt={`Completed ${recipe.foodName}`} fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[#E50914] text-[10px] tracking-widest uppercase font-bold mb-1" style={{ fontFamily: "var(--font-heading)" }}>완성된 요리</p>
              <h3 className="text-white text-4xl font-bold tracking-wider uppercase leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                {recipe.foodName}
              </h3>
              <p className="text-[#F5A623] text-lg mt-1" style={{ fontFamily: "var(--font-korean)" }}>{recipe.foodNameKorean}</p>
            </div>
          </div>

          {/* RIGHT: 재료 목록 */}
          <div>
            <h2 className="text-3xl font-bold tracking-wider uppercase text-white mb-6 flex items-center gap-3"
              style={{ fontFamily: "var(--font-heading)" }}>
              <ShoppingCart className="w-6 h-6 text-[#E50914]" />
              Ingredients
              <span className="text-[#B3B3B3] text-base font-normal normal-case tracking-normal ml-2">
                {recipe.ingredients.length} items
              </span>
            </h2>
            <div className="space-y-2">
              {recipe.ingredients.map((ingredient, i) => (
                <div key={i}
                  className="flex items-start gap-3 bg-[#141414] border border-[#2A2A2A] p-4 hover:border-[#E50914]/30 transition-colors group">
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
                    <a href={`https://www.amazon.com/s?k=${encodeURIComponent(ingredient.amazonSearchTerm)}&tag=kdramafood-20`}
                      target="_blank" rel="noopener noreferrer nofollow"
                      className="text-[#B3B3B3] hover:text-[#F5A623] text-xs flex-shrink-0 transition-colors whitespace-nowrap">
                      Buy →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 pb-16">

        {/* ── INSTRUCTIONS ── */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-wider uppercase text-white mb-6 flex items-center gap-3"
            style={{ fontFamily: "var(--font-heading)" }}>
            <ChefHat className="w-6 h-6 text-[#E50914]" />
            Instructions
            <span className="text-[#B3B3B3] text-base font-normal normal-case tracking-normal ml-2">
              {recipe.steps.length} steps
            </span>
          </h2>
          <div className="space-y-4">
            {recipe.steps.map((step) => (
              <div key={step.number}
                className="bg-[#141414] border border-[#2A2A2A] p-6 hover:border-[#E50914]/30 transition-colors grid grid-cols-[48px_1fr] gap-4">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl font-bold text-[#E50914] leading-none"
                    style={{ fontFamily: "var(--font-heading)" }}>
                    {step.number}
                  </span>
                  {step.duration && (
                    <span className="flex items-center gap-1 text-[#F5A623] text-xs whitespace-nowrap">
                      <Timer className="w-3 h-3" />{step.duration}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg tracking-wide mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}>
                    {step.title}
                  </h3>
                  <p className="text-[#B3B3B3] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── AD ── */}
        <div className="mb-12">
          <AdSlot slotId="recipe-middle" />
        </div>

        {/* ── VIEWER REACTIONS ── */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-wider uppercase text-white mb-2 flex items-center gap-3"
            style={{ fontFamily: "var(--font-heading)" }}>
            <MessageCircle className="w-6 h-6 text-[#E50914]" />
            K-Drama Fans React
          </h2>
          <p className="text-[#B3B3B3] text-sm mb-6">What fans said after making this recipe</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reactions.map((r, i) => (
              <div key={i} className="bg-[#141414] border border-[#2A2A2A] p-5 hover:border-[#E50914]/20 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E50914]/20 border border-[#E50914]/30 flex items-center justify-center text-sm">
                      {r.flag}
                    </div>
                    <span className="text-white text-sm font-medium">@{r.user}</span>
                  </div>
                  <span className="text-[#B3B3B3] text-xs">❤️ {r.likes.toLocaleString()}</span>
                </div>
                <p className="text-[#B3B3B3] text-sm leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── YOUTUBE SECTION ── */}
        <div className="mb-12 bg-[#0D0D0D] border border-[#2A2A2A] p-8">
          <div className="flex items-center gap-3 mb-4">
            <Play className="w-6 h-6 text-[#E50914]" />
            <h2 className="text-3xl font-bold tracking-wider uppercase text-white"
              style={{ fontFamily: "var(--font-heading)" }}>
              Watch It Being Made
            </h2>
          </div>
          <p className="text-[#B3B3B3] mb-6">
            See how real Korean home cooks and chefs make <span className="text-white font-medium">{recipe.foodName}</span>.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={`https://www.youtube.com/results?search_query=${ytQuery}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#E50914] hover:bg-[#C1050F] text-white px-6 py-3 transition-all hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.1em" }}>
              <Play className="w-4 h-4 fill-white" />
              Search on YouTube
            </a>
            <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.foodName + " " + recipe.dramaName + " recipe")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#E50914] text-white px-6 py-3 transition-colors"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.1em" }}>
              <Tv className="w-4 h-4 text-[#E50914]" />
              {recipe.dramaName} Scene
            </a>
          </div>
          <p className="text-[#B3B3B3]/40 text-xs mt-4">
            Tip: Search &quot;Maangchi {recipe.foodName}&quot; for authentic Korean recipes
          </p>
        </div>

        {/* ── MORE FROM DRAMA ── */}
        {otherRecipes.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-wider uppercase text-white"
                style={{ fontFamily: "var(--font-heading)" }}>
                More from {recipe.dramaName}
              </h2>
              <Link href={`/dramas/${recipe.dramaSlug}`}
                className="text-[#E50914] hover:text-white text-sm transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}>
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

        <AdSlot slotId="recipe-bottom" />
      </div>
    </div>
  );
}
