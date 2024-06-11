import React from 'react';

export const AddressCell = ({ info }) => (
  <div className="min-w-[292px] px-4 font-normal">
    <p>{info.getValue()}</p>
  </div>
);
