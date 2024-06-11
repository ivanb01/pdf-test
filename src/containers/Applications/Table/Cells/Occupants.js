import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

export const OccupantsCell = ({ info }) => {
  return (
    <div className="flex items-center justify-center  min-w-[90px] gap-1">
      <PersonIcon className="text-gray3 w-[20px] h-[20px]" />
      <span>{info.renderValue().length + 1}</span>
    </div>
  );
};
