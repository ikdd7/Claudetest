import Link from "next/link";
import Image from "next/image";
import type { Drama } from "@/types";
import { Star } from "lucide-react";

interface DramaCardProps {
  drama: Drama;
}

export default function DramaCard({ drama }: DramaCardProps) {
  const imgSrc = `/api/og?slug=${drama.slug}&name=${encodeURIComponent(drama.title)}&type=drama`;

  return (
    <Link href={`/dramas/${drama.slug}`} className="group block">
      <div className="drama-card-hover relative rounded-sm overflow-hidden bg-[#141414] border border-[#2A2A2A] group-hover:border-[#E50914]/40 transition-colors">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={imgSrc}
            alt={drama.title}
            fill
            className="object-cover"
            unoptimized
          />

          {/* Recipe count badge */}
          <div className="absolute top-3 right-3 bg-[#E50914] text-white text-xs font-bold px-2 py-1 rounded-sm z-10">
            {drama.recipes.length} recipes
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#E50914]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
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
