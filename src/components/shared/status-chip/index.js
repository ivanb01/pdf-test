import PropTypes from 'prop-types';
import React from 'react';

export const VARIANT_ENUM = {
  PURPLE: 'purple',
  SUCCESS: 'success',
  ERROR: 'error',
  GRAY: 'gray',
  WARNING: 'warning',
};

const StatusChip = ({ variant, text }) => {
  let className = '';
  const getClassNames = () => {
    switch (variant) {
      case VARIANT_ENUM.PURPLE:
        className = 'text-[#7C3AED] bg-purple1';
        break;
      case VARIANT_ENUM.SUCCESS:
        className = 'text-[#027A48] bg-[#ECFDF3]';
        break;
      case VARIANT_ENUM.ERROR:
        className = 'text-[#B42318] bg-[#FEF3F2]';
        break;
      case VARIANT_ENUM.GRAY:
        className = 'text-[#344054] bg-[#F2F4F7]';
        break;
      case VARIANT_ENUM.WARNING:
        className = 'text-[#EA580C] bg-[#FFF7ED]';
        break;
      default:
        className = '';
        break;
    }
    return className;
  };
  if (!Object.values(VARIANT_ENUM).includes(variant)) {
    return <></>;
  }

  return (
    <div className={`${getClassNames()} w-fit text-xs capitalize  font-medium  rounded-2xl px-2 py-[3px] text-center`}>
      {text}
    </div>
  );
};

export default StatusChip;
StatusChip.propTypes = {
  variant: PropTypes.oneOf(Object.values(VARIANT_ENUM)),
  text: React.Children,
};
