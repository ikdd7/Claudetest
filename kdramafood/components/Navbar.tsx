"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/dramas", label: "드라마" },
    { href: "/search", label: "검색" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur-md border-b border-white/5">
      <div className="px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span
              className="text-lg font-bold tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-[#E50914]">K</span>
              <span className="text-white">Drama</span>
              <span className="text-[#E50914]">Food</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all ${
                  pathname === link.href
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              className="ml-2 p-2 text-white/60 hover:text-white transition-colors"
            >
              <Search className="w-4.5 h-4.5" />
            </Link>
          </div>

          {/* Mobile: search + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/search" className="p-2 text-white/60 hover:text-white">
              <Search className="w-5 h-5" />
            </Link>
            <button
              className="p-2 text-white/60 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111111] border-t border-white/5 py-2">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`block px-4 py-3 text-sm font-medium transition-colors ${
              pathname === "/" ? "text-[#E50914]" : "text-white/70 hover:text-white"
            }`}
          >
            홈
          </Link>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 text-sm font-medium transition-colors ${
                pathname === link.href ? "text-[#E50914]" : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
