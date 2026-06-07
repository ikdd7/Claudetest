import Link from "next/link";
import { Search, ChefHat, Tv, Sparkles, ArrowRight } from "lucide-react";
import DramaCard from "@/components/DramaCard";
import RecipeCard from "@/components/RecipeCard";
import { dramas, getAllRecipes } from "@/data/dramas";

export default function HomePage() {
  const featuredDramas = dramas.slice(0, 6);
  const trendingRecipes = getAllRecipes().slice(0, 6);

  return (
    <div className="bg-[#0A0A0A]">
      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden korean-pattern-bg">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E50914]/5 via-transparent to-[#F5A623]/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#E50914]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/20 text-[#E50914] text-xs tracking-widest uppercase px-4 py-2 mb-6">
            <Sparkles className="w-3 h-3" />
            AI-Powered K-Drama Recipes
          </div>

          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Eat What
            <br />
            <span className="text-gradient-red">They Eat</span>
          </h1>

          <p className="text-[#B3B3B3] text-lg sm:text-xl md:text-2xl mb-3 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Recipes from your favorite K-Dramas
          </p>
          <p className="text-[#B3B3B3]/60 text-sm mb-10 max-w-xl mx-auto">
            From Squid Game&apos;s dalgona to Crash Landing&apos;s ramyeon — cook the food that made you pause the episode.
          </p>

          {/* Search bar */}
          <Link href="/search" className="block max-w-xl mx-auto mb-8">
            <div className="flex items-center bg-[#141414] border border-[#2A2A2A] hover:border-[#E50914] focus-within:border-[#E50914] transition-colors rounded-sm overflow-hidden group">
              <Search className="w-5 h-5 text-[#B3B3B3] group-hover:text-[#E50914] ml-4 transition-colors" />
              <span className="flex-1 px-4 py-4 text-[#B3B3B3] text-sm">
                Search recipes, dramas, or ingredients...
              </span>
              <span
                className="bg-[#E50914] hover:bg-[#C1050F] text-white text-xs tracking-widest uppercase px-6 py-4 transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Search
              </span>
            </div>
          </Link>

          <div className="flex flex-wrap justify-center gap-3">
            {["Ramyeon", "Tteokbokki", "Dalgona", "Kimchi Jjigae", "Kimbap"].map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="text-xs text-[#B3B3B3] hover:text-[#E50914] border border-[#2A2A2A] hover:border-[#E50914]/40 px-3 py-1.5 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#B3B3B3]/40">
          <div className="w-0.5 h-8 bg-gradient-to-b from-transparent to-[#E50914]/60" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* FEATURED DRAMAS */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-wider uppercase text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Popular Dramas
            </h2>
            <p className="text-[#B3B3B3] text-sm mt-1">Click a drama to explore its iconic dishes</p>
          </div>
          <Link
            href="/dramas"
            className="flex items-center gap-2 text-[#E50914] hover:text-white text-sm tracking-widest uppercase transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {featuredDramas.map((drama) => (
            <DramaCard key={drama.slug} drama={drama} />
          ))}
        </div>
      </section>

      {/* TRENDING RECIPES */}
      <section className="py-16 px-4 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-wider uppercase text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Trending Recipes
              </h2>
              <p className="text-[#B3B3B3] text-sm mt-1">The dishes everyone&apos;s craving right now</p>
            </div>
            <Link
              href="/search"
              className="flex items-center gap-2 text-[#E50914] hover:text-white text-sm tracking-widest uppercase transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              All Recipes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-wider uppercase text-white mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            How It Works
          </h2>
          <p className="text-[#B3B3B3]">From drama scene to dinner plate in 3 steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Tv className="w-8 h-8 text-[#E50914]" />,
              step: "01",
              title: "Pick Your Drama",
              desc: "Browse our library of K-dramas and discover all the iconic food moments.",
            },
            {
              icon: <Search className="w-8 h-8 text-[#F5A623]" />,
              step: "02",
              title: "Describe the Scene",
              desc: "Enter a scene description or food name, and our AI identifies and explains the dish.",
            },
            {
              icon: <ChefHat className="w-8 h-8 text-[#E50914]" />,
              step: "03",
              title: "Cook It Tonight",
              desc: "Get a full English recipe with ingredients, steps, and Amazon shopping links.",
            },
          ].map(({ icon, step, title, desc }) => (
            <div
              key={step}
              className="bg-[#141414] border border-[#2A2A2A] p-8 relative overflow-hidden group hover:border-[#E50914]/30 transition-colors"
            >
              <div className="absolute top-4 right-4 text-6xl font-bold text-[#2A2A2A] group-hover:text-[#E50914]/10 transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {step}
              </div>
              <div className="relative">
                <div className="w-14 h-14 bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3
                  className="text-white text-xl font-bold tracking-wider uppercase mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {title}
                </h3>
                <p className="text-[#B3B3B3] text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI RECIPE CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#E50914]/10 via-transparent to-[#F5A623]/10 border-t border-b border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto text-center">
          <Sparkles className="w-8 h-8 text-[#E50914] mx-auto mb-4" />
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-wider uppercase text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Can&apos;t Find Your Scene?
          </h2>
          <p className="text-[#B3B3B3] mb-8 leading-relaxed">
            Describe any food scene from any K-drama and our AI will identify the dish and generate a complete, authentic recipe just for you.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-3 bg-[#E50914] hover:bg-[#C1050F] text-white px-8 py-4 transition-all hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.1em" }}
          >
            <Sparkles className="w-4 h-4" />
            Generate AI Recipe
          </Link>
        </div>
      </section>
    </div>
  );
}
