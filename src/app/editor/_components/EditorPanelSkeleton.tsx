import { LuTerminal } from "react-icons/lu";

export function EditorPanelSkeleton() {
  return (
    <div className="relative">
      <div className="relative bg-dark/90 backdrop-blur rounded-xl border border-border/5 p-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-dark ring-1 ring-light/5 animate-pulse" />
            <div>
              <div className="w-24 h-4 bg-light/10 rounded animate-pulse mb-2" />
              <div className="w-32 h-3 bg-light/5 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 h-9 bg-dark rounded-lg ring-1 ring-light/5 animate-pulse" />
            <div className="w-9 h-9 bg-dark rounded-lg ring-1 ring-light/5 animate-pulse" />
            <div className="w-20 h-9 bg-primary/20 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Editor Area Skeleton */}
        <div className="relative rounded-xl overflow-hidden ring-1 ring-light/5">
          <div className="h-[600px] bg-dark/50 backdrop-blur-sm p-4">
            {/* Code line skeletons */}
            {[...Array(15)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 mb-3">
                <div className="w-12 h-4 bg-light/5 rounded animate-pulse" />
                <div
                  className="h-4 bg-light/5 rounded animate-pulse"
                  style={{ width: `${Math.random() * 60 + 20}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OutputPanelSkeleton() {
  return (
    <div className="relative bg-dark/90 backdrop-blur rounded-xl border border-border/5 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-dark ring-1 ring-light/5">
            <LuTerminal className="w-4 h-4 text-primary/50" />
          </div>
          <div className="w-16 h-4 bg-light/10 rounded animate-pulse" />
        </div>
      </div>

      {/* Output Area Skeleton */}
      <div className="relative">
        <div className="relative bg-dark/50 backdrop-blur-sm border border-border rounded-xl p-4 h-[600px]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-light/5 rounded-xl animate-pulse" />
              <div className="w-48 h-4 mx-auto bg-light/5 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading state for the entire editor view
export function EditorViewSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <EditorPanelSkeleton />
      <OutputPanelSkeleton />
    </div>
  );
}
