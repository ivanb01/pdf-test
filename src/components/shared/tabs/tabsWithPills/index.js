/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TabsWithPills({ propertiesCurrentTab, setPropertiesCurrentTab, tabs, className }) {
  return (
    <div className={className}>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300"
          defaultValue={propertiesCurrentTab}>
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <a
              key={tab.name}
              href={tab.href}
              onClick={() => setPropertiesCurrentTab(index)}
              className={classNames(
                propertiesCurrentTab == index ? 'bg-lightBlue1 text-lightBlue3' : 'text-gray-500 hover:text-gray-700',
                'rounded-md px-3 py-2 text-sm font-medium',
              )}
              aria-current={propertiesCurrentTab == index ? 'page' : undefined}>
              {tab.name}
              {tab.count ? (
                <span
                  className={classNames(
                    'bg-gray-100 text-gray-900',
                    'ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block',
                  )}>
                  {tab.count}
                </span>
              ) : null}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
