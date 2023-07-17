import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div className="bg-white flex items-center justify-center w-full h-full absolute bottom-0 left-0 right-0 top-0">
      <CircularProgress></CircularProgress>
    </div>
  );
};

export default Loader;
