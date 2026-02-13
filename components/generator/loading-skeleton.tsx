import { Glass } from "@/components/ui/glass";

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="fade-up"
          style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
        >
          <Glass depth={2} className="overflow-hidden">
            {/* Header skeleton */}
            <div className="flex items-center gap-3 border-b border-glass-border px-5 py-3">
              <div className="shimmer h-6 w-6 rounded-lg" />
              <div className="shimmer h-4 w-28 rounded-md" />
              <div className="shimmer h-4 w-16 rounded-full" />
            </div>
            {/* Body skeleton */}
            <div className="space-y-3 p-5">
              <div className="shimmer h-3 w-16 rounded-md" />
              <div className="shimmer h-5 w-48 rounded-md" />
              <div className="mt-2 rounded-xl border border-glass-border p-4" style={{ backgroundColor: "var(--theme-body-bg)" }}>
                <div className="space-y-2">
                  <div className="shimmer h-3 w-full rounded-md" />
                  <div className="shimmer h-3 w-5/6 rounded-md" />
                  <div className="shimmer h-3 w-4/6 rounded-md" />
                  <div className="shimmer h-3 w-3/4 rounded-md" />
                </div>
              </div>
            </div>
          </Glass>
        </div>
      ))}
    </div>
  );
}
