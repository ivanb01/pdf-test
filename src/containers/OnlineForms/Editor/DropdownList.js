import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const DropdownList = ({ toolbarRef, setShowBlockOptionsDropDown, options, buttonRef }) => {
  const dropDownRef = useRef(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;
    const button = buttonRef.current;

    if (toolbar !== null && dropDown !== null && button) {
      const { top, left } = button.getBoundingClientRect();

      dropDown.style.top = `${top + 45}px`;
      dropDown.style.left = `${left}px`;
    }
  }, [dropDownRef, toolbarRef, buttonRef]);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event) => {
        const target = event.target;

        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

  return (
    <div
      className="z-10 block absolute shadow-[0px_4px_6px_-1px_#0000001a,0px_2px_4px_-1px_#0000000f] rounded-lg min-w-[100px] min-h-[40px] bg-white "
      ref={dropDownRef}>
      <ul className="flex divide-x">
        {options.map(({ id, fields, title }) => {
          return (
            <li key={id} className="">
              {title && (
                <div className="px-[13px] py-[10px]">
                  <span className=" font-semibold text-base leading-5">{title}</span>
                </div>
              )}
              <ul className="mb-[12px]">
                {fields.map(({ id, label, icon, onClick }) => {
                  return (
                    <li className="flex w-full " key={id}>
                      <button
                        className="py-[10px] pr-[13px] pl-6 text-gray7 cursor-pointer leading-5 text-[14px] flex shrink-0  rounded-lg   hover:bg-[#eee] w-full"
                        onClick={onClick}
                        key={id}>
                        {icon && <span className={`flex w-5 h-5 select-none	mr-3 leading-4 bg-contain ${icon || ''}`} />}
                        <span className="flex grow-1 leading-5 ">{label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropdownList;

DropdownList.propTypes = {
  editor: PropTypes.object,
  toolbarRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  buttonRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  setShowBlockOptionsDropDown: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    }),
  ),
};
