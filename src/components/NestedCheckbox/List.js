import React, { useRef } from 'react';
import Checkbox from './Checkbox';

export const status = Object.freeze({
  unchecked: 0,
  checked: 1,
  indeterminate: -1,
});

export default function List(props) {
  const { items, compute, setOpenDropdown } = props;

  return (
    <ul
      className={'cursor-pointer'}
      onClick={(e) => {
        e.stopPropagation();
        setOpenDropdown(true);
      }}
    >
      {items.map((item) => {
        let childList = null;
        if (Array.isArray(item.items)) {
          childList = <List items={item.items} compute={compute} setOpenDropdown={setOpenDropdown} />;
        }
        return (
          <li
            key={item.id}
            className={'pb-1 px-3 '}
            onClick={(e) => {
              e.stopPropagation();
              const checkbox = document.getElementById(item.id + 'checkbox');
              if (checkbox) {
                checkbox.indeterminate = item.status === status.indeterminate;
                checkbox.checked = item.status === status.checked;
                compute(item.id, checkbox.checked ? 0 : 1);
              }
            }}
          >
            <div className={'pb-1 '}>
              <Checkbox
                id={item.id + 'checkbox'}
                name={item.name}
                checked={item.status === status.checked}
                indeterminate={item.status === status.indeterminate}
                compute={compute}
                setOpenDropdown={setOpenDropdown}
              />
              <label htmlFor={item.name} className={'ml-2 cursor-pointer'}>
                {item.name}
              </label>
            </div>
            {childList}
          </li>
        );
      })}
    </ul>
  );
}
