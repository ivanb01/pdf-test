import CloseIcon from '@mui/icons-material/Close';
import { ChevronDownIcon } from '@heroicons/react/solid';
import SimpleBar from 'simplebar-react';
import List from '@components/NestedCheckbox/List';
import React, { useEffect, useRef, useState } from 'react';

const NeighbourhoodDropdown = ({
                                 initializeStatus,
                                 items,
                                 setItems,
                                 setIds,
                                 setDatav2,
                                 datav2,
                                 border,
                                 style,
                                 className,
                               }) => {
  const statuss = Object.freeze({
    unchecked: 0,
    checked: 1,
    indeterminate: -1,
  });

  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [neighborhoodsSearch, setNeighborhoodsSearch] = useState('');
  useEffect(() => {
    if (openDropdown === false) {
      setNeighborhoodsSearch('');
    }
  }, [openDropdown]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [setOpenDropdown]);
  useEffect(() => {
    // Use a temporary variable to store the new data
    const newData = [];
    const idsOfNeighboorhoods = [];

    items.forEach((d) => {
      if (d.status === 1) {
        newData.push(d.name);
        d.items.forEach((i) => {
          if (i.status === 1) {
            idsOfNeighboorhoods.push(i.id);
          }
        });
      } else {
        d.items.forEach((i) => {
          if (i.status === 1) {
            newData.push(i.name);
            idsOfNeighboorhoods.push(i.id);
          }
        });
      }
    });

    console.log(newData, 'newData');

    const idsString = idsOfNeighboorhoods.join(',');
    setIds(idsString);

    // Set the new data in the state
    setDatav2(newData);
  }, [items]);
  const setStatuss = (root, status) => {
    root.status = status;
    if (Array.isArray(root.items)) {
      return root.items.forEach((item) => {
        setStatuss(item, status);
      });
    }
  };
  const computeStatus = (items) => {
    let checked = 0;
    let indeterminate = 0;

    items.forEach((item) => {
      if (item.status && item.status === statuss?.checked) checked++;
      if (item.status && item.status === statuss?.indeterminate) indeterminate++;
    });

    if (checked === items.length) {
      return statuss.checked;
    } else if (checked > 0 || indeterminate > 0) {
      return statuss.indeterminate;
    }
  };
  const traverse = (root, needle, status) => {
    let id;
    let items;

    if (Array.isArray(root)) {
      items = root;
    } else {
      id = root.id;
      items = root.items;
    }

    // return if needle is found
    // we don't have to compute the status of the items if root.id === needle
    if (id === needle) {
      return setStatuss(root, status);
    }

    if (!items) {
      return root;
    } else {
      items.forEach((item) => traverse(item, needle, status));
      root.status = computeStatus(items);
    }
  };
  const compute = (checkboxId, status) => {
    traverse(items, checkboxId, status);
    setItems(items.slice());
  };

  const filterData = (data, searchTerm) => {
    return data.reduce((result, item) => {
      const isParentMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

      const filteredItems = item.items.filter((subItem) =>
        subItem.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      if (isParentMatch && filteredItems.length === 0) {
        result.push(item);
      } else if (filteredItems.length > 0) {
        result.push({ ...item, items: filteredItems });
      }

      return result;
    }, []);
  };
  return <div
    ref={dropdownRef}
    className={
      ` ${className} ${border ? 'border border-blue1' : 'border border-gray-300'}  min-w-[170px] flex justify-between h-[38px] px-2 py-[9px] relative  text-sm font-medium text-[#808080] rounded-md`
    }
    style={{ flex: 1, maxWidth: '300px', position: 'relative', ...style }}
    onClick={() => {
      setOpenDropdown(!openDropdown);
      setTimeout(() => {
        document.querySelector(`#custom-dropdown-search`)?.focus();
      }, 200);
    }}>
    <div
      className={`max-w-[300px] overflow-hidden font-normal whitespace-nowrap overflow-ellipsis  ${datav2.length > 0 ? 'text-gray8' : 'text-[#808080]'}`}>
      {datav2.length > 0 ? datav2.join(',') : 'Select Neighborhood'}
    </div>
    <div className={'flex'}>
      {datav2.length > 0 && (
        <CloseIcon
          className={`transition-all h-5 w-5 text-gray3 cursor-pointer`}
          aria-hidden='true'
          onClick={(e) => {
            e.stopPropagation();
            initializeStatus() && initializeStatus();
            setDatav2([]);
          }}
        />
      )}
      <ChevronDownIcon
        className={`transition-all h-5 w-5 text-gray3 ${openDropdown && 'rotate-180'}`}
        aria-hidden='true'
      />
    </div>
    {openDropdown && (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpenDropdown(true);
        }}
        className={
          'flex-1 left-0 py-3 pl-[10px] z-10 absolute top-[45px] shadow-lg min-w-[500px] w-full bg-white max-h-[250px] rounded-md  text-base ring-1 ring-black ring-opacity-5  focus:outline-none sm:text-sm'
        }>
        <SimpleBar style={{ maxHeight: '235px', height: '100%', paddingRight: '12px', ...style }}>
          <input
            className={`text-sm mb-2 text-gray8 pl-3 border border-gray2 rounded-lg bg-white px-[13px] h-[35px] w-full  mt-1 ml-0.5 outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 z-[9999999]`}
            id={`custom-dropdown-search`}
            type={'text'}
            placeholder={'Select'}
            onChange={(e) => setNeighborhoodsSearch(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setOpenDropdown(true);
            }}
          />
          {filterData(items, neighborhoodsSearch).length > 0 ? (
            <div className={'mt-2'}>
              <List
                items={filterData(items, neighborhoodsSearch)}
                compute={compute}
                setOpenDropdown={setOpenDropdown}
              />
            </div>
          ) : (
            <div className={'text-sm mb-1 text-gray8 text-center mt-2'}>No Neighborhood with this name</div>
          )}
        </SimpleBar>
      </div>
    )}
  </div>;
};

export default NeighbourhoodDropdown;