import React, { useState } from 'react';
import ApiInputDropdown from '@components/shared/ApiInputDropdown';
import useDebouncedValue from 'hooks/useDebounceValue';
import { useFetchUsers } from '@helpers/queries/queries';
import { CircularProgress } from '@mui/material';

const AgentSearchDropdown = ({ onListItemClick, ...props }) => {
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = useDebouncedValue(searchValue, 500);

  const { data: userData, isLoading: isLoadingUsers } = useFetchUsers({
    search_param: debounceValue,
  });

  const onAgentClick = (agent) => {
    onListItemClick(agent);
  };

  return (
    <div>
      <ApiInputDropdown>
        <ApiInputDropdown.SearchInput searchValue={searchValue} setSearchValue={setSearchValue} {...props} />
        <ApiInputDropdown.ListContainer className="rounded-b shadow-md" isLoading={isLoadingUsers}>
          <ApiInputDropdown.List className="">
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
          <ApiInputDropdown.EmptyList>
            <div className=" w-full h-full flex justify-center items-center ">
              <span className="text-[14px] leading-5 text-gray4">No agent found...</span>
            </div>
          </ApiInputDropdown.EmptyList>
          <ApiInputDropdown.Loading>
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress className="h-4 w-5" />
            </div>
          </ApiInputDropdown.Loading>
        </ApiInputDropdown.ListContainer>
      </ApiInputDropdown>
    </div>
  );
};

export default AgentSearchDropdown;
