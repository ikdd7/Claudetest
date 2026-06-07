import Link from "next/link";
import Image from "next/image";
import type { Recipe, Drama } from "@/types";
import { Clock } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe & { drama?: Drama };
  dramaName?: string;
  compact?: boolean;
}

const DIFF_BADGE: Record<string, string> = {
  Easy:   "bg-green-500/90",
  Medium: "bg-orange-500/90",
  Hard:   "bg-red-600/90",
};

export default function RecipeCard({ recipe, dramaName, compact = false }: RecipeCardProps) {
  const name = dramaName || recipe.drama?.title || recipe.dramaName;
  const slug = recipe.slug.replace(/^(cloy|bp|eaw|qot|mlfts|reply1988|startup)-?/, "");
  const imgSrc = `/api/og?slug=${slug}&name=${encodeURIComponent(recipe.foodName)}&korean=${encodeURIComponent(recipe.foodNameKorean)}&type=recipe`;

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className={`block flex-shrink-0 ${compact ? "w-[155px]" : "w-full"}`}
    >
      <div className="relative rounded-2xl overflow-hidden aspect-[3/4] group">
        <Image
          src={imgSrc}
          alt={recipe.foodName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

        {/* Time — top right */}
        <div className="absolute top-2.5 right-2.5">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5">
            <Clock className="w-2.5 h-2.5 text-white/70" />
            <span className="text-[9px] text-white/70 font-medium">{recipe.cookTime + recipe.prepTime}m</span>
          </div>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex gap-1 mb-1.5 flex-wrap">
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full text-white ${DIFF_BADGE[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
            {name && !compact && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#E50914]/80 text-white truncate max-w-[100px]">
                {name}
              </span>
            )}
          </div>
          <h3
            className={`text-white font-bold leading-tight ${compact ? "text-xs line-clamp-2" : "text-sm"}`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {recipe.foodName}
          </h3>
          <p className="text-white/50 text-[9px] mt-0.5" style={{ fontFamily: "var(--font-korean)" }}>
            {recipe.foodNameKorean}
          </p>
        </div>
      </div>
    </Link>
  );
}
