export function DramaCardSkeleton() {
  return (
    <div className="bg-[#141414] border border-[#2A2A2A] rounded-sm overflow-hidden">
      <div className="aspect-[2/3] shimmer" />
      <div className="p-3">
        <div className="h-3 shimmer rounded w-3/4 mb-2" />
        <div className="h-3 shimmer rounded w-1/2" />
      </div>
    </div>
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="bg-[#141414] border border-[#2A2A2A] rounded-sm overflow-hidden">
      <div className="h-44 shimmer" />
      <div className="p-4">
        <div className="h-5 shimmer rounded w-3/4 mb-2" />
        <div className="h-3 shimmer rounded w-1/3 mb-3" />
        <div className="h-3 shimmer rounded w-full mb-1.5" />
        <div className="h-3 shimmer rounded w-4/5" />
      </div>
    </div>
  );
}

export function RecipePageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="h-[50vh] shimmer" />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="h-6 shimmer rounded w-1/3 mb-4" />
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 shimmer rounded" />
                <div className="h-4 shimmer rounded flex-1" />
              </div>
            ))}
          </div>
          <div>
            <div className="h-6 shimmer rounded w-1/3 mb-4" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#141414] border border-[#2A2A2A] rounded-sm p-4 mb-3">
                <div className="h-4 shimmer rounded w-1/4 mb-2" />
                <div className="h-3 shimmer rounded w-full mb-1" />
                <div className="h-3 shimmer rounded w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
