const CircleIcon = ({ color, small, padding, active, children }) => {
  let iconPadding = small ? 'p-[4px]' : padding ? padding : 'p-[14px]';
  let iconBorder = small ? 'border-4' : 'border-8';
  return (
    <div
      className={`${
        active ? 'bg-white border-lightBlue2' : 'bg-gray10 border-gray1'
      } relative rounded-full ${iconPadding} ${iconBorder}`}>
      {children}
    </div>
  );
};

export default CircleIcon;
