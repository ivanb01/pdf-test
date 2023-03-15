import { Disclosure } from '@headlessui/react';

export default function SubmenuItem({ item, ...props }) {
  return (
    <Disclosure.Panel className="space-y-1">
      {item.children.map((subItem) => (
        <Disclosure.Button
          key={subItem.name}
          as="a"
          href={subItem.href}
          className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
        >
          {subItem.name}
        </Disclosure.Button>
      ))}
    </Disclosure.Panel>
  );
}
