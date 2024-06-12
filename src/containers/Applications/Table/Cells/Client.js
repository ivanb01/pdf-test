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
      <Avatar src={''} initials={initials} />
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
