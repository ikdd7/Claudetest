import Link from "next/link";
import Image from "next/image";
import type { Recipe, Drama } from "@/types";
import { Clock, Tv } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe & { drama?: Drama };
  dramaName?: string;
}

const DIFFICULTY_COLORS = {
  Easy: "text-green-400 border-green-400/30 bg-green-400/10",
  Medium: "text-[#F5A623] border-[#F5A623]/30 bg-[#F5A623]/10",
  Hard: "text-[#E50914] border-[#E50914]/30 bg-[#E50914]/10",
};

export default function RecipeCard({ recipe, dramaName }: RecipeCardProps) {
  const name = dramaName || recipe.drama?.title || recipe.dramaName;
  const slug = recipe.slug.replace(/^(cloy|bp|eaw|qot|mlfts|reply1988|startup)-?/, "");
  const imgSrc = `/api/og?slug=${slug}&name=${encodeURIComponent(recipe.foodName)}&korean=${encodeURIComponent(recipe.foodNameKorean)}&type=recipe`;

  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block">
      <div className="bg-[#141414] border border-[#2A2A2A] group-hover:border-[#E50914]/40 rounded-sm overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.2)] h-full">
        {/* Image area */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={imgSrc}
            alt={recipe.foodName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

          {/* Difficulty badge */}
          <div className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 border rounded-sm z-10 ${DIFFICULTY_COLORS[recipe.difficulty]}`}>
            {recipe.difficulty}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3
            className="text-white font-bold text-lg leading-tight mb-0.5 group-hover:text-[#E50914] transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {recipe.foodName}
          </h3>
          <p className="text-[#F5A623] text-xs mb-2" style={{ fontFamily: "var(--font-korean)" }}>
            {recipe.foodNameKorean}
          </p>

          <p className="text-[#B3B3B3] text-xs leading-relaxed mb-3 line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex items-center justify-between">
            {name && (
              <div className="flex items-center gap-1.5 text-[#B3B3B3]">
                <Tv className="w-3 h-3 text-[#E50914]" />
                <span className="text-[11px] truncate max-w-[140px]">{name}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-[#B3B3B3] ml-auto">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{recipe.cookTime + recipe.prepTime}m</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
