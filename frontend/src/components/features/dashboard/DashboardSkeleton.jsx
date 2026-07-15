const DashboardSkeleton = () => {
  return (
    <div className="p-4 grid grid-cols-2 gap-4">

      {/* Monthly Budget Summary */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        {/* Title + badge */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-3 w-28 bg-gray-100 rounded-full animate-pulse" />
          </div>
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* 3 stats */}
        <div className="flex gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 w-16 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
            </div>
          ))}
        </div>

        {/* Budget Health */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-3 w-24 bg-gray-100 rounded-full animate-pulse" />
            <div className="h-3 w-20 bg-gray-100 rounded-full animate-pulse" />
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <div className="h-4 w-32 bg-gray-200 rounded-full animate-pulse" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-24 bg-gray-200 rounded-full animate-pulse" />
              </div>
              <div className="h-3 w-14 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full animate-pulse" />
          </div>
        ))}
      </div>

      {/* Weekly Activity */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-28 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-24 bg-gray-100 rounded-full animate-pulse" />
        </div>
        {/* Chart bars */}
        <div className="flex items-end justify-between h-28 pt-4">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className="w-6 bg-gray-200 rounded-t-md animate-pulse"
                style={{ height: `${[40, 70, 50, 90, 60, 30, 80][i]}%` }}
              />
              <div className="h-2 w-4 bg-gray-100 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-36 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-3 w-12 bg-gray-100 rounded-full animate-pulse" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse shrink-0" />
              <div className="space-y-1.5">
                <div className="h-3 w-28 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-2 w-20 bg-gray-100 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="h-3 w-14 bg-gray-200 rounded-full animate-pulse" />
          </div>
        ))}
      </div>

    </div>
  );
};

export default DashboardSkeleton;