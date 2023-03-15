const CircleStepNumber = ({ number, className }) => {
  return (
    <div
      className={`border-[3px] border-gray3 text-gray3 rounded-full p-2 h-7 w-7 flex items-center justify-center ${className}`}
    >
      {number}
    </div>
  );
};

export default CircleStepNumber;
