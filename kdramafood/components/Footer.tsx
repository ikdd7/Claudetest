import Link from "next/link";
import { Tv } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Tv className="w-5 h-5 text-[#E50914]" />
              <span
                className="text-lg font-bold tracking-widest uppercase text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                KDrama<span className="text-[#E50914]">Food</span>
              </span>
            </Link>
            <p className="text-[#B3B3B3] text-sm leading-relaxed">
              Discover and cook the iconic Korean dishes from your favorite K-dramas.
            </p>
          </div>

          <div>
            <h3
              className="text-white text-sm tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Explore
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/dramas", label: "All Dramas" },
                { href: "/search", label: "Search Recipes" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#B3B3B3] hover:text-[#E50914] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-white text-sm tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              About
            </h3>
            <p className="text-[#B3B3B3] text-sm leading-relaxed">
              Recipes use AI to bring K-drama cuisine to your kitchen. Amazon links are affiliate links.
            </p>
          </div>
        </div>

        <div className="border-t border-[#2A2A2A] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#B3B3B3] text-xs">
            © {new Date().getFullYear()} KDramaFood. Not affiliated with any drama production companies.
          </p>
          <p className="text-[#B3B3B3] text-xs">
            Made with ❤ for K-drama fans everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
