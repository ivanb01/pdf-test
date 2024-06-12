import React from 'react';

const PropertiesSkeleton = ({ cardsLength }) => {
  const skeletonCards = Array.from({ length: cardsLength });

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {skeletonCards.map((_, index) => (
        <div key={index} role="status" className="max-w-sm border border-gray-200 rounded shadow animate-pulse">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300"></div>
          <div className="p-4 md:p-6">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertiesSkeleton;
