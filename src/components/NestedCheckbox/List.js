import React, { useEffect } from 'react';
import Checkbox from './Checkbox';
export const status = Object.freeze({
  unchecked: 0,
  checked: 1,
  indeterminate: -1,
});

export default function List(props) {
  const { items, compute, setOpenDropdown } = props;

  return (
    <ul>
      {items.map((item) => {
        let childList = null;
        if (Array.isArray(item.items)) {
          childList = <List items={item.items} compute={compute} setOpenDropdown={setOpenDropdown} />;
        }
        return (
          <li key={item.id} className={'pb-1 px-3'} onClick={() => setOpenDropdown(true)}>
            <div className={'pb-1'}>
              <Checkbox
                id={item.id}
                name={item.name}
                onClick={() => console.log(item.status, item.name)}
                checked={item.status === status.checked}
                indeterminate={item.status === status.indeterminate}
                compute={compute}
                setOpenDropdown={setOpenDropdown}
              />
              <label htmlFor={item.name} className={'ml-2'}>
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
