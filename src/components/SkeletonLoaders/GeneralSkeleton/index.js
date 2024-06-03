const GeneralSkeleton = ({ className, rows = 5, roundedIcon = true }) => {
  return (
    <div role="status" class={`${className} py-4 space-y-4 rounded animate-pulse`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center">
            {roundedIcon && <div className="h-8 w-8 bg-gray-300 rounded-full ring-8 ring-white mr-3"></div>}
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
        </div>
      ))}
      <span class="sr-only">Loading...</span>
    </div>
  );
};

export default GeneralSkeleton;
