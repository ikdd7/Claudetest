import type { Metadata } from "next";
import { dramas } from "@/data/dramas";
import DramaCard from "@/components/DramaCard";

export const metadata: Metadata = {
  title: "All K-Dramas — KDramaFood",
  description: "Browse all K-dramas and discover iconic Korean food recipes featured in each show.",
};

export default function DramasPage() {
  const genres = Array.from(new Set(dramas.flatMap((d) => d.genre)));
  const totalRecipes = dramas.reduce((acc, d) => acc + d.recipes.length, 0);

  return (
    <div className="min-h-screen bg-[#111111]">

      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <p className="text-[#E50914] text-[11px] font-bold uppercase tracking-wider mb-1">Drama Library</p>
        <h1
          className="text-3xl font-bold text-white mb-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          모든 드라마
        </h1>
        <p className="text-white/40 text-sm">
          {dramas.length}개 드라마 · {totalRecipes}개 레시피
        </p>
      </div>

      {/* Genre filter tabs */}
      <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
        <button className="flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full bg-[#E50914] text-white">
          전체
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            className="flex-shrink-0 text-xs font-medium px-4 py-2 rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all"
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Drama grid */}
      <div className="px-4 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {dramas.map((drama) => (
            <DramaCard key={drama.slug} drama={drama} />
          ))}
        </div>
      </div>

    </div>
  );
}
