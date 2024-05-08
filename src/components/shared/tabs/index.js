import Image from 'next/image';
import { classNames } from 'global/functions';
import { useState } from 'react';
import Loader from '../loader';
import Button from '../button';
import { PlusIcon } from '@heroicons/react/solid';

export default function Tabs({
  tabs = [],
  className,
  withNumbers,
  current,
  setCurrent,
  loadingTabs,
  navClassName,
  wrapperClassName,
  addCampaignButton,
  triggerCreateCustomCampaign,
  ...props
}) {
  const handleSetCurrent = (id) => () => {
    setCurrent(id);
  };
  return (
    <div className={`w-full h-auto bg-gray10 flex flex-col ${wrapperClassName}`}>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:lightBlue3 focus:lightBlue3 border-text-gray4 rounded-md"
          defaultValue={tabs[current]?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className={`hidden sm:flex ${className} bg-white pt-2`}>
        <nav className={`border-b border-gray-200 -mb-px flex space-x-8 ${navClassName}`} aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              onClick={handleSetCurrent(tab.id)}
              className={classNames(
                current === tab.id
                  ? 'border-lightBlue3 text-lightBlue3'
                  : 'border-transparent text-gray4 hover:text-gray4 hover:border-gray4',
                'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
              )}
            >
              {withNumbers ? (
                <>
                  {tab.name}
                  <span
                    className={classNames(
                      current == tab.id ? 'bg-lightBlue2 text-lightBlue3' : 'bg-gray-100 text-gray-900',
                      'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block',
                    )}
                  >
                    {tab.count}
                  </span>
                </>
              ) : (
                <>
                  {tab.icon && <div className="mr-3">{tab.icon}</div>}
                  <span
                    className={classNames(
                      current === tab.id ? 'text-lightBlue3' : 'text-gray4 hover:text-gray4 hover:border-gray4',
                    )}
                  >
                    {tab.name}
                  </span>
                </>
              )}
            </a>
          ))}
        </nav>
        {addCampaignButton && (
          <div className="flex items-center">
            <div className="italic text-gray-700 mr-3 text-sm font-medium">Want to create it yourself?</div>
            <Button leftIcon={<PlusIcon />} secondary label="Custom Campaign" onClick={triggerCreateCustomCampaign} />
          </div>
        )}
      </div>
      {loadingTabs ? (
        <div className="relative" style={{ height: 'calc(100vh - 158px)' }}>
          <Loader />
        </div>
      ) : (
        tabs.find((tab) => tab.id == current)?.content
      )}
    </div>
  );
}
