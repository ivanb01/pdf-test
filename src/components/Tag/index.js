const Tag = ({ children, onClick, selected }) => {
  return (
    <div
      className={`px-[10px] py-[5px] rounded-[70px] border ${
        !selected ? 'border-gray2 ' : 'border-blue2 bg-[#EFF6FF]'
      } mb-4`}
      onClick={onClick}
      role={'button'}>
      <p className={`text-xs leading-4 font-medium ${!selected ? 'text-neutral1' : 'text-[#3B82F6]'}`}> {children}</p>
    </div>
  );
};

export default Tag;
