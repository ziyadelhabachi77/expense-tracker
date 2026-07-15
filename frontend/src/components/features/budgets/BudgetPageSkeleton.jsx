const BudgetPageSkeleton = () => {
  return (
    <div>
      {/* Master Budget card skeleton */}
      <div className="bg-white ring ring-gray-300 shadow p-5 rounded mb-10">
        <div className="h-6 w-40 bg-gray-200 rounded-full animate-pulse mb-5" />
        <div className="mt-5 flex justify-between flex-col gap-7 xl:flex-row xl:gap-0 items-start">
          {/* Left: description + input */}
          <div className="flex-1 space-y-3">
            <div className="h-3 w-72 bg-gray-100 rounded-full animate-pulse" />
            <div className="h-3 w-56 bg-gray-100 rounded-full animate-pulse" />
            <div className="h-4 w-36 bg-gray-200 rounded-full animate-pulse mt-4" />
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
          {/* Right: allocated + remaining cards */}
          <div className="flex flex-col xl:flex-row w-full gap-3 items-start flex-1">
            <div className="bg-gray-100 p-7 w-full ring ring-gray-300 min-w-50 h-40 rounded-md animate-pulse" />
            <div className="bg-gray-100 p-7 w-full ring ring-gray-200 min-w-50 h-40 rounded-md animate-pulse" />
          </div>
        </div>
      </div>

      {/* Header + button skeleton */}
      <div className="flex items-center justify-between mb-7">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-3 w-64 bg-gray-100 rounded-full animate-pulse" />
        </div>
        <div className="h-10 w-44 bg-gray-200 rounded-md animate-pulse" />
      </div>

      {/* Tab nav skeleton */}
      <div className="border-b border-gray-300 flex gap-4 mb-5">
        <div className="h-4 w-24 bg-gray-200 rounded-full animate-pulse mb-3" />
        <div className="h-4 w-28 bg-gray-100 rounded-full animate-pulse mb-3" />
      </div>

      {/* Budget cards skeleton */}
      <div className="pt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="ring ring-gray-400/70 bg-white rounded-md p-6"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse" />
                <div className="flex flex-col gap-2 items-end">
                  <div className="h-3 w-10 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="h-7 w-32 bg-gray-200 rounded-full animate-pulse mt-4 mb-3" />
              <div className="flex items-center justify-between mb-2">
                <div className="h-3 w-24 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-3 w-28 bg-gray-100 rounded-full animate-pulse" />
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-2xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetPageSkeleton;
