import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const FilterDropdown = ({ types, icon, data, align = 'end', side = 'bottom' }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{icon}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side={side}
          align={align}
          sideOffset={8}
          onClick={(e) => e.stopPropagation()}
          className={
            ' w-56 z-50 shadow-lg bg-white rounded-md  ring-1 ring-black ring-opacity-5 focus:outline-none py-1'
          }>
          {types.map((type, index) => {
            return (
              <DropdownMenu.Item
                key={index}
                className="text-gray6 block px-4 py-2 text-sm hover:bg-gray1 focus:outline-none"
                onClick={() => type.handleClick(data)}>
                {type.name}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default FilterDropdown;
