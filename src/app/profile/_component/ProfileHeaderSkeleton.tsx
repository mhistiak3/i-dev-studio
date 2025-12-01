function ProfileHeaderSkeleton() {
  return (
    <div
      className="relative mb-8 bg-linear-to-br from-dark to-dark/80 rounded-2xl p-8 border
     border-border/50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[32px]" />
      <div className="relative flex items-center gap-8">
        {/* Avatar Skeleton */}
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-primary/30 rounded-full blur-xl" />
          <div className="w-24 h-24 rounded-full bg-light/5 animate-pulse relative z-10 border-4 border-border/50" />
          <div
            className="absolute -top-2 -right-2 w-8 h-8 bg-linear-to-r from-primary/50 
          to-primary/60 rounded-full z-20 animate-pulse"
          />
        </div>

        {/* User Info Skeleton */}
        <div className="space-y-3">
          <div className="h-8 w-48 bg-light/5 rounded animate-pulse" />
          <div className="h-5 w-32 bg-light/5 rounded animate-pulse" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative p-4 rounded-xl bg-dark/20 border border-border/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br opacity-5" />
            <div className="relative space-y-4">
              {/* Stat Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-light/5 rounded animate-pulse" />
                  <div className="h-8 w-16 bg-light/5 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-light/5 rounded animate-pulse" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-light/5 animate-pulse" />
              </div>

              {/* Stat Footer */}
              <div className="pt-4 border-t border-border/50 flex items-center gap-2">
                <div className="h-4 w-4 bg-light/5 rounded animate-pulse" />
                <div className="h-4 w-20 bg-light/5 rounded animate-pulse" />
                <div className="h-4 w-16 bg-light/5 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileHeaderSkeleton;
