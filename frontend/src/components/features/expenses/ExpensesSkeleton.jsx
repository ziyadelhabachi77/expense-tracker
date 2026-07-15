const ExpensesSkeleton = () => {
  return (
    <div className="w-full flex flex-col justify-between min-w-0 shadow rounded bg-white min-h-120">
      {/* Table skeleton */}
      <table className="w-full h-full relative">
        <thead className="bg-[#F3F4F5] text-left">
          <tr>
            <th className="text-gray-400 text-xs uppercase pl-5 py-2">Date</th>
            <th className="text-gray-400 text-xs uppercase pl-5 py-2">Description</th>
            <th className="text-gray-400 text-xs uppercase pl-5 py-2">Category</th>
            <th className="text-gray-400 text-xs uppercase pl-5 py-2">Amount</th>
            <th className="text-gray-400 text-xs uppercase pl-5 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, i) => (
            <tr key={i} className="border-b border-gray-300/50">
              <td className="pl-5 py-4">
                <div className="h-4 w-24 bg-gray-200 rounded-full animate-pulse" />
              </td>
              <td className="pl-5 py-4">
                <div className="h-4 w-40 bg-gray-200 rounded-full animate-pulse" />
              </td>
              <td className="pl-5 py-4">
                <div className="h-4 w-28 bg-gray-200 rounded-full animate-pulse" />
              </td>
              <td className="pl-5 py-4">
                <div className="h-4 w-16 bg-gray-200 rounded-full animate-pulse" />
              </td>
              <td className="pl-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between bg-white p-4">
        <div className="h-4 w-56 bg-gray-200 rounded-full animate-pulse" />
        <div className="flex gap-3">
          <div className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ExpensesSkeleton;