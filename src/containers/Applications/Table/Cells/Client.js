import React from 'react';
import Avatar from '@components/shared/avatar';

export const ClientCell = ({ info }) => {
  const { client_first_name, client_last_name, client_email } = info.row.original;
  const initials =
    client_first_name.split(' ')[0].charAt(0) +
    '.' +
    client_last_name.split(' ')[client_last_name.split(' ').length - 1].charAt(0) +
    '.';
  return (
    <div className="flex gap-3 min-w-[240px] px-4 items-center ">
      <Avatar initials={initials} className={'w-[40px] h-[40px] bg-gray4 text-[14px] font-medium leading-5'} />
      <div>
        <p>
          <span>{client_first_name}</span>
          <span>{` ${client_last_name}`}</span>
        </p>
        <p className="font-normal text-gray4">{client_email}</p>
      </div>
    </div>
  );
};
