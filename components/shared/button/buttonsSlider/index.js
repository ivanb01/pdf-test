const ButtonsSlider = ({ buttons, currentButton, className, onClick, noCount }) => {
  return (
    <div
      className={`relative self-center bg-gray10 rounded-lg px-3 py-[6px] flex ${className}`}
    >
      {buttons.map((button) => {
        return (
          <button
            key={button.id}
            type="button"
            onClick={() => onClick(button.id)}
            className={`relative w-1/2 transition-all ${
              currentButton == button.id ? 'bg-white  shadow' : ''
            } rounded-md border-transparent border py-2 text-sm font-medium whitespace-nowrap focus:z-10 sm:w-auto sm:px-4`}
          >
            <span className={`${currentButton == button.id ? 'text-gray5' : 'text-gray4'}`}>
              {button.name ? button.name : button.icon}
            </span>{' '}
            { !noCount && 
              <span className="text-gray3">
                {button.count && button.count != '' && `(${button.count})`}
              </span>
            }
          </button>
        );
      })}
    </div>
  );
};

export default ButtonsSlider;
