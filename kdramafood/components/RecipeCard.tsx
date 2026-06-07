import Link from "next/link";
import type { Recipe, Drama } from "@/types";
import { Clock, ChefHat, Tv } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe & { drama?: Drama };
  dramaName?: string;
}

const DIFFICULTY_COLORS = {
  Easy: "text-green-400 border-green-400/30 bg-green-400/10",
  Medium: "text-[#F5A623] border-[#F5A623]/30 bg-[#F5A623]/10",
  Hard: "text-[#E50914] border-[#E50914]/30 bg-[#E50914]/10",
};

const FOOD_GRADIENTS = [
  "from-red-950 via-orange-950 to-amber-900",
  "from-amber-950 via-yellow-950 to-orange-900",
  "from-orange-950 via-red-950 to-rose-900",
  "from-stone-900 via-amber-950 to-yellow-900",
  "from-red-900 via-rose-950 to-pink-950",
];

export default function RecipeCard({ recipe, dramaName }: RecipeCardProps) {
  const name = dramaName || recipe.drama?.title || recipe.dramaName;
  const gradientIndex = recipe.slug.length % FOOD_GRADIENTS.length;
  const gradient = FOOD_GRADIENTS[gradientIndex];

  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block">
      <div className="bg-[#141414] border border-[#2A2A2A] group-hover:border-[#E50914]/40 rounded-sm overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.2)] h-full">
        {/* Image area */}
        <div className={`relative h-44 bg-gradient-to-br ${gradient} overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-black/30 border border-white/10 flex items-center justify-center mx-auto mb-2">
                <ChefHat className="w-7 h-7 text-[#F5A623]" />
              </div>
              <p
                className="text-white/60 text-xs tracking-widest uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {recipe.foodNameKorean}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

          {/* Difficulty badge */}
          <div className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 border rounded-sm ${DIFFICULTY_COLORS[recipe.difficulty]}`}>
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
