import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const FOOD_CONFIG: Record<string, { emoji: string; bg: string[]; accent: string }> = {
  // Recipes
  ramyeon: { emoji: "🍜", bg: ["#7f1d1d", "#991b1b"], accent: "#fca5a5" },
  "doenjang-jjigae": { emoji: "🥘", bg: ["#78350f", "#92400e"], accent: "#fcd34d" },
  japchae: { emoji: "🍝", bg: ["#14532d", "#166534"], accent: "#86efac" },
  "budae-jjigae": { emoji: "🍲", bg: ["#7f1d1d", "#7c2d12"], accent: "#fb923c" },
  tanghulu: { emoji: "🍡", bg: ["#4c1d95", "#5b21b6"], accent: "#c4b5fd" },
  "dakgalbi": { emoji: "🍗", bg: ["#7c2d12", "#92400e"], accent: "#fdba74" },
  dalgona: { emoji: "🍬", bg: ["#78350f", "#713f12"], accent: "#fde68a" },
  "triangle-kimbap": { emoji: "🍙", bg: ["#1e3a5f", "#1e3a8a"], accent: "#93c5fd" },
  "gganbu-eggs": { emoji: "🥚", bg: ["#1c1917", "#292524"], accent: "#d6d3d1" },
  chimaek: { emoji: "🍗", bg: ["#7c2d12", "#991b1b"], accent: "#fca5a5" },
  tteokbokki: { emoji: "🌶️", bg: ["#991b1b", "#7f1d1d"], accent: "#fca5a5" },
  hotteok: { emoji: "🥞", bg: ["#78350f", "#92400e"], accent: "#fcd34d" },
  "kimchi-jjigae": { emoji: "🥣", bg: ["#991b1b", "#7f1d1d"], accent: "#fca5a5" },
  nurungji: { emoji: "🍚", bg: ["#78350f", "#451a03"], accent: "#fde68a" },
  sikhye: { emoji: "🧋", bg: ["#1e3a5f", "#1e3a8a"], accent: "#bae6fd" },
  samgyeopsal: { emoji: "🥩", bg: ["#7c2d12", "#9a3412"], accent: "#fdba74" },
  bossam: { emoji: "🥬", bg: ["#14532d", "#166534"], accent: "#86efac" },
  "kimchi-fried-rice": { emoji: "🍳", bg: ["#991b1b", "#78350f"], accent: "#fcd34d" },
  kimbap: { emoji: "🌿", bg: ["#14532d", "#1a2e05"], accent: "#86efac" },
  "tuna-kimbap": { emoji: "🐟", bg: ["#1e3a5f", "#0c4a6e"], accent: "#7dd3fc" },
  dosirak: { emoji: "🍱", bg: ["#1a2e05", "#14532d"], accent: "#bef264" },
  galbi: { emoji: "🥩", bg: ["#7c2d12", "#450a0a"], accent: "#fca5a5" },
  sujeonggwa: { emoji: "🍵", bg: ["#4c1d95", "#2e1065"], accent: "#ddd6fe" },
  "japchae-deluxe": { emoji: "✨", bg: ["#14532d", "#166534"], accent: "#fbbf24" },
  jjajangmyeon: { emoji: "🍜", bg: ["#1c1917", "#292524"], accent: "#a8a29e" },
  "soju-anju": { emoji: "🍶", bg: ["#1e3a5f", "#312e81"], accent: "#a5b4fc" },
  "mapo-tofu": { emoji: "🌶️", bg: ["#7f1d1d", "#450a0a"], accent: "#fca5a5" },
  "instant-ramen": { emoji: "🍜", bg: ["#7f1d1d", "#991b1b"], accent: "#fca5a5" },
  bungeoppang: { emoji: "🐟", bg: ["#78350f", "#92400e"], accent: "#fde68a" },
  "hotteok-v2": { emoji: "🍫", bg: ["#1c0a00", "#3b1c08"], accent: "#fde68a" },
  // Dramas
  "crash-landing-on-you": { emoji: "🌸", bg: ["#1e3a5f", "#1e3a8a"], accent: "#93c5fd" },
  "itaewon-class": { emoji: "🍺", bg: ["#7c2d12", "#9a3412"], accent: "#fdba74" },
  "squid-game": { emoji: "🟩", bg: ["#14532d", "#166534"], accent: "#86efac" },
  "my-love-from-the-star": { emoji: "⭐", bg: ["#4c1d95", "#5b21b6"], accent: "#c4b5fd" },
  "reply-1988": { emoji: "📺", bg: ["#78350f", "#92400e"], accent: "#fcd34d" },
  "business-proposal": { emoji: "💼", bg: ["#831843", "#9d174d"], accent: "#f9a8d4" },
  "extraordinary-attorney-woo": { emoji: "🐋", bg: ["#0c4a6e", "#164e63"], accent: "#7dd3fc" },
  "queen-of-tears": { emoji: "👑", bg: ["#7f1d1d", "#991b1b"], accent: "#fcd34d" },
  vincenzo: { emoji: "🌹", bg: ["#1c1917", "#292524"], accent: "#fca5a5" },
  "start-up": { emoji: "🚀", bg: ["#14532d", "#166534"], accent: "#6ee7b7" },
};

const DEFAULT_CONFIG = { emoji: "🍽️", bg: ["#1c1917", "#292524"], accent: "#e5e7eb" };

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";
  const name = searchParams.get("name") || "";
  const korean = searchParams.get("korean") || "";
  const type = searchParams.get("type") || "recipe"; // 'recipe' or 'drama'

  const config = FOOD_CONFIG[slug] || DEFAULT_CONFIG;
  const [bgFrom, bgTo] = config.bg;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 100%)`,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.04) 0%, transparent 60%)",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: config.accent,
            opacity: 0.8,
          }}
        />

        {/* Emoji */}
        <div style={{ fontSize: type === "drama" ? 80 : 96, marginBottom: 16, lineHeight: 1 }}>
          {config.emoji}
        </div>

        {/* Name */}
        {name && (
          <div
            style={{
              color: "white",
              fontSize: type === "drama" ? 28 : 24,
              fontWeight: 700,
              textAlign: "center",
              maxWidth: "80%",
              lineHeight: 1.2,
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {name}
          </div>
        )}

        {/* Korean name */}
        {korean && (
          <div
            style={{
              color: config.accent,
              fontSize: 18,
              marginTop: 8,
              opacity: 0.9,
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            {korean}
          </div>
        )}

        {/* Type badge */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            background: "rgba(0,0,0,0.4)",
            border: `1px solid ${config.accent}40`,
            color: config.accent,
            fontSize: 11,
            padding: "3px 8px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {type === "drama" ? "K-Drama" : "Recipe"}
        </div>

        {/* KDramaFood watermark */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            color: "rgba(255,255,255,0.2)",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          KDramaFood
        </div>
      </div>
    ),
    {
      width: 600,
      height: type === "drama" ? 900 : 440,
    }
  );
}
