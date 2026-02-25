/**
 * ═══════════════════════════════════════════════════════════════
 * LOADING SKELETONS — Professional Loading States
 * ═══════════════════════════════════════════════════════════════
 */

export function SectionSkeleton() {
  return (
    <div className="min-h-screen bg-cyber-bg py-32 animate-pulse">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20">
          <div className="h-1 w-12 bg-gray-800 mb-4" />
          <div className="h-12 w-64 bg-gray-800 rounded mb-4" />
          <div className="h-6 w-96 bg-gray-800 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-800/50 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <div className="min-h-screen bg-cyber-bg py-24 animate-pulse">
      <div className="px-6 mb-16">
        <div className="mx-auto max-w-7xl">
          <div className="h-1 w-12 bg-gray-800 mb-4" />
          <div className="h-12 w-80 bg-gray-800 rounded mb-4" />
          <div className="h-6 w-96 bg-gray-800 rounded" />
        </div>
      </div>
      <div className="flex gap-4 px-6 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 h-96 bg-gray-800/50 rounded-xl"
            style={{ width: "clamp(300px, 85vw, 480px)" }}
          />
        ))}
      </div>
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div className="min-h-screen bg-cyber-bg py-32 animate-pulse">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-20 text-center">
          <div className="h-1 w-12 bg-gray-800 mx-auto mb-4" />
          <div className="h-12 w-64 bg-gray-800 rounded mx-auto mb-4" />
        </div>
        <div className="space-y-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex-shrink-0" />
              <div className="flex-1 h-32 bg-gray-800/50 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e17] to-[#000306] py-36 animate-pulse">
      <div className="mx-auto max-w-4xl px-8">
        <div className="mb-14 text-center">
          <div className="h-1 w-16 bg-gray-800 mx-auto mb-5" />
          <div className="h-12 w-80 bg-gray-800 rounded mx-auto mb-4" />
          <div className="h-6 w-96 bg-gray-800 rounded mx-auto" />
        </div>
        <div className="rounded-xl border border-cyan-900/40 bg-gradient-to-b from-[#0f1625] to-[#0a0f1c] p-8">
          <div className="space-y-5">
            <div className="h-12 bg-gray-800/50 rounded-lg" />
            <div className="h-12 bg-gray-800/50 rounded-lg" />
            <div className="h-32 bg-gray-800/50 rounded-lg" />
            <div className="h-12 w-48 bg-gray-800/50 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
