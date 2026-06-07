import type { Metadata } from "next";
import { dramas } from "@/data/dramas";
import DramaCard from "@/components/DramaCard";
import { Tv } from "lucide-react";

export const metadata: Metadata = {
  title: "All K-Dramas",
  description: "Browse all K-dramas and discover iconic Korean food recipes featured in each show.",
};

export default function DramasPage() {
  const genres = Array.from(new Set(dramas.flatMap((d) => d.genre)));

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#141414] to-[#0A0A0A] border-b border-[#2A2A2A] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Tv className="w-6 h-6 text-[#E50914]" />
            <span className="text-[#E50914] text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-heading)" }}>
              Drama Library
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-wider uppercase text-white mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            All Dramas
          </h1>
          <p className="text-[#B3B3B3] max-w-xl">
            {dramas.length} K-dramas with {dramas.reduce((acc, d) => acc + d.recipes.length, 0)} authentic recipes
          </p>
        </div>
      </div>

      {/* Genre filters */}
      <div className="sticky top-16 z-40 bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-[#2A2A2A] py-3 px-4">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto no-scrollbar">
          <button className="flex-shrink-0 text-xs px-3 py-1.5 bg-[#E50914] text-white tracking-widest uppercase" style={{ fontFamily: "var(--font-heading)" }}>
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              className="flex-shrink-0 text-xs px-3 py-1.5 border border-[#2A2A2A] text-[#B3B3B3] hover:border-[#E50914] hover:text-white transition-colors tracking-widest uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Drama grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {dramas.map((drama) => (
            <DramaCard key={drama.slug} drama={drama} />
          ))}
        </div>
      </div>
    </div>
  );
}
