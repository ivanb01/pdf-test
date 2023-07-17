/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react';
import MenuItem from './menu-item';
import { menuItems } from './menuItems';
import SubmenuItem from './submenu-item';

export default function Sidebar() {
  return (
    <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
      <div className="mt-5 flex-grow flex flex-col">
        <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
          {menuItems.map((item) => (
            <Disclosure as="div" key={item.name} className="space-y-1">
              {({ open }) => (
                <>
                  <MenuItem open={open} item={item} />
                  {Array.isArray(item.children) && item.children.length > 0 && (
                    <SubmenuItem item={item} />
                  )}
                </>
              )}
            </Disclosure>
          ))}
        </nav>
      </div>
    </div>
  );
}
