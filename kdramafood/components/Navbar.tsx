"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X, Tv } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/dramas", label: "Dramas" },
    { href: "/search", label: "Search" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-[#E50914] transition-colors"
          >
            <Tv className="w-6 h-6 text-[#E50914]" />
            <span
              className="text-xl font-bold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              KDrama<span className="text-[#E50914]">Food</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase font-medium transition-colors hover:text-[#E50914] ${
                  pathname === link.href
                    ? "text-[#E50914]"
                    : "text-[#B3B3B3]"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              className="p-2 text-[#B3B3B3] hover:text-[#E50914] transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-[#B3B3B3] hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-[#2A2A2A] py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-3 text-sm tracking-widest uppercase transition-colors hover:text-[#E50914] hover:bg-[#1E1E1E] ${
                pathname === link.href ? "text-[#E50914]" : "text-[#B3B3B3]"
              }`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
