import React, { useState } from 'react';
import ApiInputDropdown from '@components/shared/ApiInputDropdown';
import useDebouncedValue from 'hooks/useDebounceValue';
import { useFetchUsers } from '@helpers/queries/queries';

const AgentSearchDropdown = ({ onListItemClick, ...props }) => {
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = useDebouncedValue(searchValue, 500);

  const { data: userData } = useFetchUsers({
    search_param: debounceValue,
  });

  const onAgentClick = (agent) => {
    onListItemClick(agent);
  };

  return (
    <div>
      <ApiInputDropdown>
        <ApiInputDropdown.SearchInput searchValue={searchValue} setSearchValue={setSearchValue} {...props} />
        <ApiInputDropdown.List className="rounded-b shadow-md">
          {userData?.map((agent) => {
            return (
              <ApiInputDropdown.ListItem onItemClick={() => onAgentClick(agent)} key={agent.email}>
                <div
                  key={agent.email}
                  className="flex flex-col p-4 hover:bg-gray10 cursor-pointer text-[14px] leading-5">
                  <span className=" text-gray7 font-medium">{`${agent.first_name} ${agent.last_name}`}</span>
                  <span className=" text-gray4">{agent.email}</span>
                </div>
              </ApiInputDropdown.ListItem>
            );
          })}
        </ApiInputDropdown.List>
      </ApiInputDropdown>
    </div>
  );
};

export default AgentSearchDropdown;
