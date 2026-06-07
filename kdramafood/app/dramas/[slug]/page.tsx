import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDramaBySlug, dramas } from "@/data/dramas";
import RecipeCard from "@/components/RecipeCard";
import { Tv, Star, Clock, ChefHat, ArrowLeft, Film } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return dramas.map((drama) => ({ slug: drama.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const drama = getDramaBySlug(slug);
  if (!drama) return {};
  return {
    title: `${drama.title} — Korean Food Guide`,
    description: `Discover all Korean recipes from ${drama.title} (${drama.year}). ${drama.description}`,
  };
}

const DRAMA_HERO_GRADIENTS: Record<string, string> = {
  "crash-landing-on-you": "from-blue-950 via-slate-900 to-[#0A0A0A]",
  "itaewon-class": "from-orange-950 via-stone-900 to-[#0A0A0A]",
  "squid-game": "from-green-950 via-teal-900 to-[#0A0A0A]",
  "my-love-from-the-star": "from-purple-950 via-violet-900 to-[#0A0A0A]",
  "reply-1988": "from-amber-950 via-yellow-900 to-[#0A0A0A]",
  "business-proposal": "from-pink-950 via-rose-900 to-[#0A0A0A]",
  "extraordinary-attorney-woo": "from-cyan-950 via-sky-900 to-[#0A0A0A]",
  "queen-of-tears": "from-red-950 via-rose-900 to-[#0A0A0A]",
  "vincenzo": "from-zinc-900 via-neutral-900 to-[#0A0A0A]",
  "start-up": "from-emerald-950 via-green-900 to-[#0A0A0A]",
};

export default async function DramaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const drama = getDramaBySlug(slug);

  if (!drama) notFound();

  const gradient = DRAMA_HERO_GRADIENTS[drama.slug] || "from-neutral-900 via-zinc-950 to-[#0A0A0A]";
  const totalTime = drama.recipes.reduce((acc, r) => acc + r.cookTime + r.prepTime, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <div className={`relative min-h-[50vh] bg-gradient-to-br ${gradient} flex items-end`}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        <div className="absolute inset-0 korean-pattern-bg opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12 w-full">
          <Link
            href="/dramas"
            className="inline-flex items-center gap-2 text-[#B3B3B3] hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dramas
          </Link>

          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <Film className="w-4 h-4 text-[#E50914]" />
                <span className="text-[#E50914] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                  {drama.year} · {drama.episodes} Episodes
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider uppercase text-white mb-3 leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {drama.title}
              </h1>

              <p className="text-[#B3B3B3] max-w-2xl mb-4 leading-relaxed">{drama.description}</p>

              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-1.5 text-[#F5A623]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white font-bold">{drama.rating}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#B3B3B3]">
                  <ChefHat className="w-4 h-4 text-[#E50914]" />
                  <span>{drama.recipes.length} recipes</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#B3B3B3]">
                  <Clock className="w-4 h-4" />
                  <span>~{Math.round(totalTime / drama.recipes.length)} min avg</span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {drama.genre.map((g) => (
                    <span key={g} className="text-xs border border-[#2A2A2A] text-[#B3B3B3] px-2 py-0.5">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipes */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Tv className="w-5 h-5 text-[#E50914]" />
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-wider uppercase text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Featured Dishes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {drama.recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} dramaName={drama.title} />
          ))}
        </div>

        {/* AI Recipe Generator CTA */}
        <div className="mt-16 bg-[#141414] border border-[#2A2A2A] p-8 text-center">
          <ChefHat className="w-8 h-8 text-[#E50914] mx-auto mb-4" />
          <h3
            className="text-2xl font-bold tracking-wider uppercase text-white mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Seen a dish not listed here?
          </h3>
          <p className="text-[#B3B3B3] mb-6 max-w-lg mx-auto">
            Describe any scene from {drama.title} and our AI will identify the food and generate a full recipe.
          </p>
          <Link
            href={`/search?drama=${encodeURIComponent(drama.title)}`}
            className="inline-flex items-center gap-2 bg-[#E50914] hover:bg-[#C1050F] text-white px-6 py-3 transition-all hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.1em" }}
          >
            Generate AI Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}
