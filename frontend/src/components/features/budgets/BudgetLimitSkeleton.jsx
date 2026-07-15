const BudgetLimitSkeleton = () => {
  return (
    <div className="pt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="ring ring-gray-400/70 bg-white rounded-md p-6"
          >
            {/* Icon + Spent */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse" />
              <div className="flex flex-col gap-2 items-end">
                <div className="h-3 w-10 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Category name */}
            <div className="h-7 w-32 bg-gray-200 rounded-full animate-pulse mt-4 mb-3" />

            {/* Usage row */}
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-24 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-3 w-28 bg-gray-100 rounded-full animate-pulse" />
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full bg-gray-200 rounded-2xl animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetLimitSkeleton;
