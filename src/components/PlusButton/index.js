import Add from '@mui/icons-material/Add';

const PlusButton = ({ onClick }) => {
  return (
    <a
      className="bg-white cursor-pointer hover:bg-lightBlue3 hover:text-white flex items-center justify-center transition-all absolute right-6 bottom-6 rounded-full border-2 border-gray2 w-[60px] h-[60px] group hover:w-[150px] overflow-hidden"
      onClick={onClick}>
      <Add className="text-gray6 group-hover:text-white text-[32px]" />
      <span className="ml-1 hidden group-hover:block">Send Email</span>
    </a>
  );
};

export default PlusButton;
