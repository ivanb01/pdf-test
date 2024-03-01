import React from 'react';
import SearchInputSelect from '@components/shared/SearchInputSelect';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import { getContactsSearch } from '@api/contacts';
import PropTypes from 'prop-types';

const ClientsMultiSelect = ({ name, error, handleChange }) => {
  return (
    <SearchInputSelect
      label="Send Form To*"
      setValues={handleChange}
      fetchOptions={{
        queryFn: getContactsSearch,
        queryKey: 'online-forms-users',
      }}
      name={name}
      error={error}>
      <SearchInputSelect.Input
        render={(selectedList, onRemoveSelectedItem) => {
          return (
            <>
              {selectedList?.map((listItem) => (
                <div key={listItem.id}>
                  <div
                    className="flex items-center bg-gray1 gap-[6px] rounded-xl pr-2"
                    onClick={(e) => e.stopPropagation()}>
                    <Image
                      src={'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                      width={20}
                      height={20}
                      alt="Profile image"
                      className="rounded-full"
                    />
                    <span className="min-w-max text-xs leading-5 text-gray7 ">{`${listItem.first_name} ${listItem.last_name}`}</span>
                    <button className="flex items-center" onClick={() => onRemoveSelectedItem(listItem.id)}>
                      <CloseIcon className="w-[12px] h-[12px] text-gray4" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          );
        }}
      />

      <SearchInputSelect.List
        render={(users) => {
          return (
            <>
              {users?.map((user) => {
                return (
                  <SearchInputSelect.ListItem value={user} key={user.id}>
                    <div className="flex items-center gap-[16px] p-4 " key={user.id}>
                      <Image
                        src={'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                        width={40}
                        height={40}
                        alt="Profile image"
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm text-gray7 font-medium">{user.first_name + ' ' + user.last_name}</span>
                        <span className="text-sm text-gray4">{user.email}</span>
                      </div>
                    </div>
                  </SearchInputSelect.ListItem>
                );
              })}
            </>
          );
        }}
        noDataComponent={
          <div className="h-[100px] flex justify-center items-center text-sm font-medium text-gray5">
            No user found...
          </div>
        }
      />
    </SearchInputSelect>
  );
};

export default ClientsMultiSelect;

ClientsMultiSelect.propTypes = {
  handleChange: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string,
};
