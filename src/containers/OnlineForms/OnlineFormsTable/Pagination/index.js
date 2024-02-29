import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  return (
    <div className="flex h-[130px] items-center justify-end gap-4">
      <div className="w-[80px] flex items-center justify-center">
        <button
          className={`${currentPage > 0 ? '' : 'hidden'}`}
          onClick={() => setPage((currPage) => currPage - 1)}>
          <ChevronLeftOutlinedIcon />
        </button>
      </div>
      <div className="flex gap-4">
        {Array.from(Array(totalPages).keys()).map((number) => {
          return (
            <button
              className={`px-4 py-2 ${
                number === currentPage && 'bg-lightBlue3'
              }`}
              onClick={() => setPage(number)}>
              {number + 1}
            </button>
          );
        })}
      </div>
      <div className="w-[80px] flex items-center justify-center">
        <button
          className={`${currentPage < totalPages - 1 ? '' : 'hidden'} `}
          onClick={() => setPage((currPage) => currPage - 1)}>
          <ChevronRightOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  setPage: PropTypes.func,
};
