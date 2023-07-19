import React from 'react';
import { ArrowNarrowUpIcon, ArrowNarrowDownIcon } from '@heroicons/react/solid';
const ClientHealth = ({ healthyCount, unhealthyCount }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const getPercentage = () => {
    let totalValue = healthyCount + unhealthyCount;
    if (!Math.round((100 * healthyCount) / totalValue)) {
      return 0;
    }
    return Math.round((100 * healthyCount) / totalValue);
  };
  // bg-red-100 text-red-800
  return (
    <div>
      <div className="mb-2">
        <div
          className={
            'bg-green-100 mr-2 text-green-800 inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs font-medium md:mt-2 lg:mt-0'
          }
        >
          <ArrowNarrowUpIcon
            className="-ml-1 mr-0.5 h-4 font-bold flex-shrink-0 self-center text-green-500"
            aria-hidden="true"
          />
          {/* <ArrowDownwardRounded
          className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
          aria-hidden="true"
        /> */}
          {healthyCount}
        </div>
        <div
          className={
            'bg-red-100 text-red-800 inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs font-medium md:mt-2 lg:mt-0'
          }
        >
          <ArrowNarrowDownIcon
            className="-ml-1 mr-0.5 h-4 font-bold flex-shrink-0 self-center text-red-500"
            aria-hidden="true"
          />
          {unhealthyCount}
        </div>
      </div>
      <span
        className={`italic text-xs ${
          getPercentage() > 80 ? 'text-[#059669]' : 'text-red-500'
        }`}
      >
        {getPercentage()}% healthy
      </span>
    </div>
  );
};

export default ClientHealth;
