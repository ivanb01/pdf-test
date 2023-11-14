import CircularProgress from '@mui/material/CircularProgress';

const Loader = ({ message }) => {
  return (
    <div className="bg-white flex flex-col items-center justify-center w-full h-full absolute bottom-0 left-0 right-0 top-0">
      <CircularProgress></CircularProgress>
      {message && (
        <div className="text-gray-500 font-medium text-sm mt-6">
          Please wait, we’re looking for “Matched Properties”
        </div>
      )}
    </div>
  );
};

export default Loader;
