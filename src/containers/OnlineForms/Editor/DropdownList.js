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
      className="z-10 block absolute shadow-[0_12px_28px_0_rgba(0,0,0,0.2),0_2px_4px_0_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] rounded-lg min-w-[100px] min-h-[40px] bg-white [&>*:first-child]:mt-2 [&>*:last-child]:mb-2"
      ref={dropDownRef}
    >
      {options.map(({ id, label, icon, onClick }) => {
        return (
          <button
            className="mx-2 p-2 text-[#050505] cursor-pointer leading-4 text-base flex shrink-0  rounded-lg min-w-[268px] content-center hover:bg-[#eee]"
            onClick={onClick}
            key={id}
          >
            <span className={`flex w-5 h-5 select-none	mr-3 leading-4 bg-contain ${icon}`} />
            <span className="flex grow-1 leading-5 w-[200px]">{label}</span>
          </button>
        );
      })}
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
