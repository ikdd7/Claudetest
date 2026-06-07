import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDramaBySlug, dramas } from "@/data/dramas";
import RecipeCard from "@/components/RecipeCard";
import { Tv, Star, Clock, ChefHat, ArrowLeft, Film, Clapperboard } from "lucide-react";

const SCENE_INFO: Record<string, { episode: string; timestamp: string; character: string; situation: string }> = {
  "cloy-ramyeon":            { episode: "Episode 3",  timestamp: "~28분", character: "리정혁 & 윤세리", situation: "북한 막사에서 병사들이 숨어있는 윤세리를 위해 라면을 끓여주는 장면. 처음으로 따뜻한 연결이 싹튼다." },
  "cloy-doenjang-jjigae":    { episode: "Episode 7",  timestamp: "~15분", character: "윤세리", situation: "고향의 맛이 그리운 세리가 북한에서 처음으로 된장찌개를 직접 만들어 보는 감동적인 순간." },
  "cloy-japchae":            { episode: "Episode 12", timestamp: "~40분", character: "리정혁 & 마을 주민들", situation: "특별한 모임을 위해 잡채를 함께 준비하는 장면. 음식을 나누는 따뜻함과 경계를 넘은 유대감." },
  "itaewon-budae-jjigae":    { episode: "Episode 5",  timestamp: "~22분", character: "박새로이 & DanBam 팀", situation: "단밤의 첫 번째 주력 메뉴로 부대찌개를 선보이는 장면. 없는 것으로 최선을 만들어내는 정신." },
  "itaewon-tanghulu":        { episode: "Episode 8",  timestamp: "~18분", character: "조이서", situation: "이태원 거리를 걸으며 탕후루를 즐기는 이서. 화려하고 자유로운 그녀의 성격을 잘 보여주는 경쾌한 씬." },
  "itaewon-makgeolli-chicken": { episode: "Episode 10", timestamp: "~35분", character: "DanBam 팀 전체", situation: "힘든 하루를 마치고 팀 전체가 닭갈비와 막걸리로 함께하는 장면. 이 드라마 최고의 인기 씬 중 하나." },
  "squid-game-dalgona":      { episode: "Episode 3",  timestamp: "~12분", character: "참가자 456명 전원", situation: "무해한 어린 시절 놀이가 목숨을 건 서바이벌로 변하는, 전 세계를 충격에 빠뜨린 달고나 뽑기 게임 장면." },
  "squid-game-triangle-kimbap": { episode: "Episode 1", timestamp: "~5분", character: "성기훈 (이정재)", situation: "경마장을 나온 후 편의점에서 삼각김밥을 사는 기훈. 그의 빈곤과 절박함을 단 한 장면으로 보여준다." },
  "squid-game-gganbu-eggs":  { episode: "Episode 6",  timestamp: "~30분", character: "오일남 & 성기훈", situation: "'깐부' 에피소드에서 함께 음식을 나누는 장면. 드라마 역사상 가장 슬프고 충격적인 반전 씬 중 하나." },
  "mlfts-chimaek":           { episode: "Episode 1",  timestamp: "~20분", character: "천송이 (전지현)", situation: "치킨과 맥주 없이는 못 산다는 천송이의 치맥 사랑 첫 등장. 한국 치맥 문화를 전 세계에 알린 전설적 장면." },
  "mlfts-tteokbokki":        { episode: "Episode 8",  timestamp: "~35분", character: "천송이 & 도민준", situation: "400년의 시간을 넘어 사랑에 빠진 두 사람이 함께 떡볶이를 먹는 따뜻하고 설레는 순간." },
  "mlfts-hotteok":           { episode: "Episode 15", timestamp: "~45분", character: "천송이 & 도민준", situation: "겨울 거리에서 호떡을 나눠 먹으며 행복한 시간을 보내는 두 사람. 곧 다가올 이별을 모른 채 웃고 있다." },
  "reply1988-kimchi-jjigae": { episode: "Episode 1",  timestamp: "~10분", character: "쌍문동 엄마들", situation: "골목 이웃들이 서로의 집을 오가며 음식을 나누는 1988년 한국 서민의 따뜻하고 진한 공동체 일상." },
  "reply1988-nurungji":      { episode: "Episode 5",  timestamp: "~38분", character: "덕선 & 친구들", situation: "늦은 밤 남은 밥으로 누룽지를 끓여 나눠 먹는 청춘들. 가난하지만 그 어느 때보다 행복했던 시절의 추억." },
  "reply1988-sikhye":        { episode: "Episode 12", timestamp: "~25분", character: "쌍문동 가족 & 이웃 전체", situation: "명절 한자리에 모인 온 가족과 이웃이 함께 식혜를 마시는 장면. 한국의 공동체 정신과 전통이 녹아있다." },
  "bp-samgyeopsal":          { episode: "Episode 4",  timestamp: "~32분", character: "강태무 & 신하리", situation: "처음으로 단둘이 삼겹살을 구우며 서로의 진짜 모습을 조금씩 알아가는 핵심 로맨스 씬." },
  "bp-bossam":               { episode: "Episode 8",  timestamp: "~20분", character: "강태무 & 신하리", situation: "특별한 날을 기념하여 보쌈을 함께 먹는 장면. 두 사람의 관계가 깊어지는 중요한 전환점." },
  "bp-kimchi-fried-rice":    { episode: "Episode 6",  timestamp: "~42분", character: "신하리", situation: "늦은 밤 집에서 혼자 김치볶음밥을 만드는 하리. 지치지만 행복한 평범한 직장인의 소박한 위로." },
  "eaw-kimbap":              { episode: "Episode 1",  timestamp: "~8분",  character: "우영우 (박은빈)", situation: "첫 출근날 아침 혼자 김밥을 먹으며 하루를 준비하는 영우. 이 장면에서 그녀의 일상과 매력이 처음 드러난다." },
  "eaw-tuna-kimbap":         { episode: "Episode 4",  timestamp: "~22분", character: "우영우 & 이준호", situation: "이준호가 처음으로 영우를 위해 참치 김밥을 사다 주는 장면. 두 사람의 관계가 조금씩 가까워지기 시작한다." },
  "eaw-dosirak":             { episode: "Episode 9",  timestamp: "~30분", character: "우영우 & 동료들", situation: "도시락을 함께 나눠 먹는 점심 장면. 서로의 다름을 인정하고 어우러지는 직장 동료들의 훈훈한 순간." },
  "qot-galbi":               { episode: "Episode 2",  timestamp: "~28분", character: "홍해인 & 백현우", situation: "오랜만에 함께 갈비를 먹으며 예전 기억들을 떠올리는 두 사람. 냉랭했던 관계가 조금씩 녹아내리는 장면." },
  "qot-sujeonggwa":          { episode: "Episode 7",  timestamp: "~15분", character: "홍해인 가족", situation: "집안 어른들이 모인 자리에서 수정과를 나누는 장면. 한국 상류층 가족의 전통과 권위가 느껴지는 씬." },
  "qot-japchae-deluxe":      { episode: "Episode 14", timestamp: "~38분", character: "홍해인 & 백현우", situation: "힘든 시간을 버텨온 두 사람이 함께 잡채를 만드는 장면. 평범한 일상의 소중함을 다시금 깨닫게 해주는 순간." },
  "vincenzo-jjajangmyeon":   { episode: "Episode 3",  timestamp: "~25분", character: "빈센조 카사노 (송중기)", situation: "이탈리아 마피아 변호사 빈센조가 한국에서 처음으로 짜장면을 먹으며 충격을 받는 유머러스한 장면." },
  "vincenzo-soju-anju":      { episode: "Episode 10", timestamp: "~40분", character: "빈센조 & 홍유찬 팀", situation: "극강의 악당들에 맞서 싸우는 사람들이 서로를 격려하며 소주와 안주를 나누는 카타르시스 넘치는 장면." },
  "vincenzo-mapo-tofu":      { episode: "Episode 16", timestamp: "~20분", character: "빈센조 & 홍유찬", situation: "이탈리아와 한국의 식문화가 충돌하고 융합되는 독특한 퓨전 요리 씬. 두 사람의 케미가 폭발한다." },
  "startup-instant-ramen":   { episode: "Episode 4",  timestamp: "~35분", character: "서달미 & 남도산 팀", situation: "샌드박스 입주 첫날 밤새 코딩하며 라면으로 허기를 채우는 청춘 창업가들의 열정 넘치는 장면." },
  "startup-bungeoppang":     { episode: "Episode 8",  timestamp: "~18분", character: "서달미 & 한지평", situation: "길거리에서 붕어빵을 사 먹으며 서로의 속마음을 털어놓는 장면. 드라마 전반의 감정 변화가 응집된 순간." },
  "startup-hotteok-v2":      { episode: "Episode 12", timestamp: "~42분", character: "샌드박스 전체 팀", situation: "드디어 첫 투자를 받게 된 팀이 함께 호떡을 먹으며 기쁨을 나누는 따뜻하고 달콤한 축하 장면." },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return dramas.map((drama) => ({ slug: drama.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const drama = getDramaBySlug(slug);
  if (!drama) return {};
  return {
    title: `${drama.title} — Korean Food Guide`,
    description: `Discover all Korean recipes from ${drama.title} (${drama.year}). ${drama.description}`,
  };
}

const DRAMA_HERO_GRADIENTS: Record<string, string> = {
  "crash-landing-on-you": "from-blue-950 via-slate-900 to-[#0A0A0A]",
  "itaewon-class": "from-orange-950 via-stone-900 to-[#0A0A0A]",
  "squid-game": "from-green-950 via-teal-900 to-[#0A0A0A]",
  "my-love-from-the-star": "from-purple-950 via-violet-900 to-[#0A0A0A]",
  "reply-1988": "from-amber-950 via-yellow-900 to-[#0A0A0A]",
  "business-proposal": "from-pink-950 via-rose-900 to-[#0A0A0A]",
  "extraordinary-attorney-woo": "from-cyan-950 via-sky-900 to-[#0A0A0A]",
  "queen-of-tears": "from-red-950 via-rose-900 to-[#0A0A0A]",
  "vincenzo": "from-zinc-900 via-neutral-900 to-[#0A0A0A]",
  "start-up": "from-emerald-950 via-green-900 to-[#0A0A0A]",
};

export default async function DramaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const drama = getDramaBySlug(slug);

  if (!drama) notFound();

  const gradient = DRAMA_HERO_GRADIENTS[drama.slug] || "from-neutral-900 via-zinc-950 to-[#0A0A0A]";
  const totalTime = drama.recipes.reduce((acc, r) => acc + r.cookTime + r.prepTime, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <div className={`relative min-h-[50vh] bg-gradient-to-br ${gradient} flex items-end`}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        <div className="absolute inset-0 korean-pattern-bg opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12 w-full">
          <Link
            href="/dramas"
            className="inline-flex items-center gap-2 text-[#B3B3B3] hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dramas
          </Link>

          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <Film className="w-4 h-4 text-[#E50914]" />
                <span className="text-[#E50914] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                  {drama.year} · {drama.episodes} Episodes
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider uppercase text-white mb-3 leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {drama.title}
              </h1>

              <p className="text-[#B3B3B3] max-w-2xl mb-4 leading-relaxed">{drama.description}</p>

              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-1.5 text-[#F5A623]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white font-bold">{drama.rating}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#B3B3B3]">
                  <ChefHat className="w-4 h-4 text-[#E50914]" />
                  <span>{drama.recipes.length} recipes</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#B3B3B3]">
                  <Clock className="w-4 h-4" />
                  <span>~{Math.round(totalTime / drama.recipes.length)} min avg</span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {drama.genre.map((g) => (
                    <span key={g} className="text-xs border border-[#2A2A2A] text-[#B3B3B3] px-2 py-0.5">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipes */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Tv className="w-5 h-5 text-[#E50914]" />
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-wider uppercase text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Featured Dishes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {drama.recipes.map((recipe) => {
            const scene = SCENE_INFO[recipe.slug];
            return (
              <div key={recipe.slug} className="flex flex-col">
                <RecipeCard recipe={recipe} dramaName={drama.title} />
                {scene && (
                  <div className="bg-[#0D0D0D] border-x border-b border-[#2A2A2A] px-4 py-3">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Clapperboard className="w-3 h-3 text-[#E50914] flex-shrink-0" />
                      <span className="text-[10px] text-[#E50914] font-bold tracking-wider uppercase"
                        style={{ fontFamily: "var(--font-heading)" }}>
                        {scene.episode}
                      </span>
                      <span className="text-[#B3B3B3] text-[10px]">· {scene.timestamp}</span>
                    </div>
                    <p className="text-white text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                      <span className="text-[#F5A623]">👤</span>
                      {scene.character}
                    </p>
                    <p className="text-[#B3B3B3] text-xs leading-relaxed line-clamp-3">{scene.situation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* AI Recipe Generator CTA */}
        <div className="mt-16 bg-[#141414] border border-[#2A2A2A] p-8 text-center">
          <ChefHat className="w-8 h-8 text-[#E50914] mx-auto mb-4" />
          <h3
            className="text-2xl font-bold tracking-wider uppercase text-white mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Seen a dish not listed here?
          </h3>
          <p className="text-[#B3B3B3] mb-6 max-w-lg mx-auto">
            Describe any scene from {drama.title} and our AI will identify the food and generate a full recipe.
          </p>
          <Link
            href={`/search?drama=${encodeURIComponent(drama.title)}`}
            className="inline-flex items-center gap-2 bg-[#E50914] hover:bg-[#C1050F] text-white px-6 py-3 transition-all hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.1em" }}
          >
            Generate AI Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}
