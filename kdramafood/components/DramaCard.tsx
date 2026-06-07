import Link from "next/link";
import type { Drama } from "@/types";
import { ChefHat, Star } from "lucide-react";

interface DramaCardProps {
  drama: Drama;
}

export default function DramaCard({ drama }: DramaCardProps) {
  const DRAMA_COLORS: Record<string, string> = {
    "crash-landing-on-you": "from-blue-950 to-slate-900",
    "itaewon-class": "from-orange-950 to-stone-900",
    "squid-game": "from-green-950 to-teal-900",
    "my-love-from-the-star": "from-purple-950 to-violet-900",
    "reply-1988": "from-amber-950 to-yellow-900",
    "business-proposal": "from-pink-950 to-rose-900",
    "extraordinary-attorney-woo": "from-cyan-950 to-sky-900",
    "queen-of-tears": "from-red-950 to-rose-900",
    "vincenzo": "from-zinc-900 to-neutral-950",
    "start-up": "from-emerald-950 to-green-900",
  };

  const gradient = DRAMA_COLORS[drama.slug] || "from-neutral-900 to-zinc-950";

  return (
    <Link href={`/dramas/${drama.slug}`} className="group block">
      <div className="drama-card-hover relative rounded-sm overflow-hidden bg-[#141414] border border-[#2A2A2A] group-hover:border-[#E50914]/40 transition-colors">
        {/* Poster */}
        <div className={`relative aspect-[2/3] bg-gradient-to-br ${gradient} flex items-end`}>
          {/* Drama title overlay on the "poster" */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#E50914]/20 border border-[#E50914]/30 flex items-center justify-center mb-3">
              <ChefHat className="w-6 h-6 text-[#E50914]" />
            </div>
            <h3
              className="text-white text-xl font-bold tracking-wider uppercase leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {drama.title}
            </h3>
            <p className="text-[#B3B3B3] text-xs mt-1">{drama.year}</p>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Recipe count badge */}
          <div className="absolute top-3 right-3 bg-[#E50914] text-white text-xs font-bold px-2 py-1 rounded-sm">
            {drama.recipes.length} recipes
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#E50914]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span
              className="text-white text-sm font-bold tracking-widest uppercase bg-[#E50914] px-4 py-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              View Recipes
            </span>
          </div>
        </div>

        {/* Card info */}
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 flex-wrap">
              {drama.genre.slice(0, 2).map((g) => (
                <span
                  key={g}
                  className="text-[10px] text-[#B3B3B3] border border-[#2A2A2A] px-1.5 py-0.5"
                >
                  {g}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-[#F5A623]">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs text-[#B3B3B3]">{drama.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
