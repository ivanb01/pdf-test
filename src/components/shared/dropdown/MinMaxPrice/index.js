import Input from '@components/shared/input';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useState, useRef, useEffect } from 'react';
import Dropdown from '..';
import { minPriceOptions, maxPriceOptions } from '@global/variables';

const MinMaxPrice = ({ className, label, setMinPrice, setMaxPrice, minPrice, maxPrice, options, border }) => {
  useEffect(() => {
    setInitialLabel(label);
  }, [label]);
  const [opened, setOpened] = useState(false);
  const [intialLabel, setInitialLabel] = useState(label);
  const [touched, setTouched] = useState(false);

  const divRef = useRef(null);

  const handleDivClick = (e) => {
    let element = e.target;
    if (element === divRef.current || element.classList.contains('chevron-custom-icon') || element.tagName === 'path') {
      setOpened(!opened);
    }
    e.stopPropagation();
  };

  const handleOutsideClick = (e) => {
    if (divRef.current && !divRef.current.contains(e.target)) {
      setOpened(false);
    }
  };

  const formatNumberToMillions = (n) => {
    if (n >= 1e6) {
      const formattedValue = n % 1e6 === 0 ? (n / 1e6).toFixed(0) : (n / 1e6).toFixed(2).replace(/\.?0+$/, '');
      return `$${formattedValue}m`;
    }
    return `$${n.toLocaleString('en-US')}`;
  };

  useEffect(() => {
    let minPriceLabel = '';
    let maxPriceLabel = '';

    if (minPrice) {
      minPriceLabel = formatNumberToMillions(minPrice);
      // minPriceLabel = '$' + minPrice.toLocaleString('en-US');
    } else if (!minPrice) {
      minPriceLabel = 'Any';
    }
    if (maxPrice) {
      maxPriceLabel = formatNumberToMillions(maxPrice);
    } else if (!maxPrice) {
      maxPriceLabel = 'Any';
    }

    if (!minPrice && !maxPrice) {
      setInitialLabel(label);
      setTouched(false);
    } else {
      setInitialLabel(`${minPriceLabel} - ${maxPriceLabel}`);
      setTouched(true);
    }

    // if (minPrice && maxPrice)
    //   setInitialLabel(`$${minPrice.toLocaleString('en-US')} - $${maxPrice.toLocaleString('en-US')}`);
    // else {
    //   setInitialLabel(label);
    // }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={divRef}
      onClick={handleDivClick}
      className={`${className} ${
        touched && 'text-gray8 font-normal'
      } ${!border ? ' border-gray-300' : border} border cursor-pointer flex justify-between h-[38px] px-2 py-[9px] relative  text-sm font-medium text-[#808080] rounded-md`}
    >
      {intialLabel}
      <ChevronDownIcon
        className={`chevron-custom-icon transition-all h-5 w-5 text-gray3 ${opened && 'rotate-180'}`}
        aria-hidden="true"
      />
      <div
        className={` ${
          !opened && 'hidden'
        }  px-4 py-5 flex items-center z-10 absolute top-[120%] right-0 bg-white border border-gray-300 rounded-md p-3 min-w-[400px]`}
      >
        <Dropdown
          initialSelect={minPrice}
          options={options}
          label="Min. Price"
          minMaxUsed
          border={minPrice && 'border-blue1'}
          className="w-full mr-4"
          handleSelect={(option) => setMinPrice(option.value)}
        ></Dropdown>
        <Dropdown
          border={maxPrice && 'border-blue1'}
          initialSelect={maxPrice}
          options={minPrice ? options.filter((option) => option.value > minPrice) : options}
          label="Max. Price"
          minMaxUsed
          handleSelect={(option) => setMaxPrice(option.value)}
          className="w-full"
        ></Dropdown>
      </div>
    </div>
  );
};

export default MinMaxPrice;
