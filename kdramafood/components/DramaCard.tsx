import Link from "next/link";
import Image from "next/image";
import type { Drama } from "@/types";

interface DramaCardProps {
  drama: Drama;
}

export default function DramaCard({ drama }: DramaCardProps) {
  const imgSrc = `/api/og?slug=${drama.slug}&name=${encodeURIComponent(drama.title)}&type=drama`;

  return (
    <Link href={`/dramas/${drama.slug}`} className="block flex-shrink-0">
      <div className="relative rounded-2xl overflow-hidden aspect-[3/4] group">
        <Image
          src={imgSrc}
          alt={drama.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

        {/* Recipe count — top left */}
        <div className="absolute top-2.5 left-2.5">
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#E50914] text-white">
            {drama.recipes.length} recipes
          </span>
        </div>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-1 mb-1.5 flex-wrap">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#F5A623]/20 text-[#F5A623]">
              ★ {drama.rating}
            </span>
            {drama.genre.slice(0, 1).map((g) => (
              <span key={g} className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                {g}
              </span>
            ))}
          </div>
          <h3
            className="text-white font-bold text-sm leading-tight line-clamp-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {drama.title}
          </h3>
          <p className="text-white/40 text-[10px] mt-0.5">{drama.year} · {drama.episodes} eps</p>
        </div>
      </div>
    </Link>
  );
}
