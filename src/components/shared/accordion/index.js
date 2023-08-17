/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react';
import { classNames } from 'global/functions';
import Chip from '../chip';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';

export default function Accordion({ tabs = [], handleClick, activeSelections, defaultOpen, ...props }) {
  return (
    <div className="max-w-3xl mx-auto">
      <dl>
        {tabs.map((tab) => (
          <Disclosure as="div" key={tab.value} className="" defaultOpen={defaultOpen}>
            {({ open }) => (
              <>
                <div className="flex flex-row mt-[16px] border-b border-gray2 pb-[6px]">
                  <Disclosure.Button className="text-left w-full flex justify-between items-center text-gray4">
                    <span className="text-xs font-semibold text-gray4">{tab.title}</span>
                    <span className="ml-6 h-7 flex items-center">
                      <ExpandMoreRounded
                        className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform mr-4')}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </div>
                <Disclosure.Panel as="dd" className="mt-2">
                  {!tab.content.length ? (
                    <div className="mt-6 mb-8">{tab.content}</div>
                  ) : typeof tab.content === 'object' ? (
                    <div className="mb-4 w-[100%] pb-4 flex flex-wrap">
                      {tab.content.map((content, index) => (
                        <div key={index}>
                          <Chip
                            key={index}
                            selectedStatus={
                              activeSelections ? Object.values(activeSelections).flat().includes(content) : null
                            }
                            className={`my-2 mr-3 ${
                              Object.values(activeSelections).flat().includes(content) ? '' : 'text-gray5'
                            }`}
                            label={content == 'GmailAI' ? 'AI Smart Synced Contact' : content}
                            onClick={handleClick(content, tab?.value, tab?.onlyOneValue)}
                          />
                          <br />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-base text-gray-500">
                      {tab.content == 'GmailAI' ? 'AI Smart Synced Contact' : tab.content}
                    </p>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  );
}
