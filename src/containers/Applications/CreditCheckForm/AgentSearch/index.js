import React, { useState } from 'react';
import ApiInputDropdown from '@components/shared/ApiInputDropdown';
import useDebouncedValue from 'hooks/useDebounceValue';
import { useFetchUsers } from '@helpers/queries/queries';
import SearchDropdown from '@components/shared/dropdown/SearchDropdown/SearchDropdown';
import { fetchUsers } from '@api/user';
const AgentSearchDropdown = ({ onListItemClick, ...props }) => {
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = useDebouncedValue(searchValue, 500);

  //   const { data: userData } = useFetchUsers({
  //     search_param: debounceValue,
  //   });

  const onAgentClick = (agent) => {
    onListItemClick(agent);
  };

  const dropdownProps = {
    queryParams: {
      queryKey: ['agents'],
      queryFn: fetchUsers,
    },
    searchParamName: 'search_param',
    requestParams: '',
  };
  return (
    <div>
      <SearchDropdown {...dropdownProps}>
        <SearchDropdown.SearchInput label={props.label} />
        <SearchDropdown.List className="rounded-b shadow-md">
          {/* {userData?.map((agent) => {
            return (
              <SearchDropdown.ListItem onItemClick={() => onAgentClick(agent)} key={agent.email}>
                <div
                  key={agent.email}
                  className="flex flex-col p-4 hover:bg-gray10 cursor-pointer text-[14px] leading-5">
                  <span className=" text-gray7 font-medium">{`${agent.first_name} ${agent.last_name}`}</span>
                  <span className=" text-gray4">{agent.email}</span>
                </div>
              </SearchDropdown.ListItem>
            );
          })} */}
        </SearchDropdown.List>
      </SearchDropdown>
    </div>
  );
};

export default AgentSearchDropdown;
