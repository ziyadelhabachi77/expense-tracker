const CategoriesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 py-9 border-b border-gray-300/50 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="ring ring-gray-300 rounded p-5 bg-white flex gap-3 items-start"
        >
          <span className="p-5 rounded inline-block bg-gray-200 animate-pulse" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-28 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-3 w-44 bg-gray-100 rounded-full animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSkeleton;