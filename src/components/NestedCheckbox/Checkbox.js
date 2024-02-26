import React, { useRef, useLayoutEffect } from 'react';

export const status = Object.freeze({
  unchecked: 0,
  checked: 1,
  indeterminate: -1,
});

export default function Checkbox(props) {
  const { indeterminate, checked, id, compute, setOpenDropdown, ...rest } = props;
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
      inputRef.current.checked = checked;
    }
  }, [indeterminate, checked]);

  return (
    <input
      className="cursor-pointer focus:ring-lightBlue3 h-4 w-4 text-lightBlue3 border-gray-300 rounded"
      {...rest}
      id={id}
      ref={inputRef}
      type="checkbox"
      onChange={(e) => {
        e.stopPropagation();
        setOpenDropdown(true);
        const newStatus = inputRef.current.checked ? status.checked : status.unchecked;
        compute(id, newStatus);
      }}
    />
  );
}
