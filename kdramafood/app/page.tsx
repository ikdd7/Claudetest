import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import DramaCard from "@/components/DramaCard";
import { dramas } from "@/data/dramas";

const CATEGORIES = [
  { label: "전체", href: "/" },
  { label: "Easy", href: "/search?q=easy" },
  { label: "Medium", href: "/search?q=medium" },
  { label: "Hard", href: "/search?q=hard" },
  { label: "라면·국수", href: "/search?q=ramyeon" },
  { label: "BBQ", href: "/search?q=bbq" },
  { label: "디저트", href: "/search?q=dessert" },
  { label: "AI 레시피", href: "/search" },
];

export default function HomePage() {
  const featuredRecipe = dramas[0].recipes[0];
  const featuredSlug = featuredRecipe.slug.replace(/^(cloy|bp|eaw|qot|mlfts|reply1988|startup)-?/, "");
  const featuredImg = `/api/og?slug=${featuredSlug}&name=${encodeURIComponent(featuredRecipe.foodName)}&korean=${encodeURIComponent(featuredRecipe.foodNameKorean)}&type=recipe`;

  return (
    <div className="bg-[#111111] min-h-screen">

      {/* ── HERO BANNER ── */}
      <section className="relative mx-3 mt-3 rounded-3xl overflow-hidden" style={{ height: "52vw", maxHeight: "520px", minHeight: "260px" }}>
        <Image src={featuredImg} alt={featuredRecipe.foodName} fill className="object-cover scale-105" unoptimized priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Search — top */}
        <div className="absolute top-4 left-4 right-4 md:left-6 md:right-6">
          <Link href="/search"
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/15 max-w-md">
            <Search className="w-4 h-4 text-white/60 flex-shrink-0" />
            <span className="text-white/50 text-sm">레시피 검색...</span>
          </Link>
        </div>

        {/* Content — bottom left */}
        <div className="absolute bottom-0 left-0 p-5 md:p-8 max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#E50914] text-white uppercase tracking-wide">
              K-드라마 레시피
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/15 text-white">
              NEW
            </span>
          </div>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            드라마 속 그 음식,<br />직접 만들어보자
          </h1>
          <p className="text-white/60 text-sm mb-4 hidden sm:block">
            K-드라마 팬이라면 한 번쯤 먹어보고 싶었던 그 요리들
          </p>
          <Link
            href={`/recipes/${featuredRecipe.slug}`}
            className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
          >
            지금 만들기 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── CATEGORY TABS ── */}
      <div className="flex gap-2 px-4 pt-4 pb-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.label}
            href={cat.href}
            className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full transition-all ${
              i === 0
                ? "bg-[#E50914] text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* ── DRAMA SECTIONS ── */}
      <div className="py-2 pb-4">
        {dramas.map((drama) => (
          <section key={drama.slug} className="mb-8">
            {/* Section header */}
            <div className="flex items-end justify-between px-4 mb-3 mt-4">
              <div>
                <p className="text-[#E50914] text-[11px] font-bold uppercase tracking-wider mb-0.5">
                  {drama.year} · {drama.genre[0]}
                </p>
                <h2
                  className="text-white text-xl md:text-2xl font-bold leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {drama.title}
                </h2>
              </div>
              <Link
                href={`/dramas/${drama.slug}`}
                className="text-[#E50914] text-sm font-bold flex items-center gap-1 flex-shrink-0 ml-4 hover:text-white transition-colors"
              >
                더보기 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Horizontal recipe cards */}
            <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
              {drama.recipes.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} dramaName={drama.title} compact />
              ))}
              {/* See all card */}
              <Link href={`/dramas/${drama.slug}`} className="block flex-shrink-0 w-[100px]">
                <div className="aspect-[3/4] rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#E50914]/20 border border-[#E50914]/30 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-[#E50914]" />
                  </div>
                  <span className="text-white/50 text-[10px] text-center px-2 leading-tight">모두<br/>보기</span>
                </div>
              </Link>
            </div>
          </section>
        ))}
      </div>

      {/* ── ALL DRAMAS ── */}
      <section className="px-4 mb-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-[#E50914] text-[11px] font-bold uppercase tracking-wider mb-0.5">Library</p>
            <h2 className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              모든 드라마
            </h2>
          </div>
          <Link href="/dramas" className="text-[#E50914] text-sm font-bold flex items-center gap-1 hover:text-white transition-colors">
            전체보기 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {dramas.map((drama) => (
            <div key={drama.slug} className="w-[140px] flex-shrink-0">
              <DramaCard drama={drama} />
            </div>
          ))}
        </div>
      </section>

      {/* ── AI CTA ── */}
      <section className="px-4 pb-10">
        <div className="rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#E50914]/25 via-[#1A0505] to-[#0A0A0A] border border-[#E50914]/20 p-6">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none" />
          <Sparkles className="w-6 h-6 text-[#E50914] mb-3" />
          <h2
            className="text-white text-xl font-bold mb-1.5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            원하는 레시피가 없나요?
          </h2>
          <p className="text-white/50 text-sm mb-5 max-w-xs leading-relaxed">
            K-드라마 어떤 장면이든 설명하면 AI가 정통 레시피를 만들어드려요
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-[#E50914] hover:bg-[#C1050F] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> AI 레시피 만들기
          </Link>
        </div>
      </section>

    </div>
  );
}
