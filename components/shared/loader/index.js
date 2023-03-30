import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div className="bg-white flex items-center justify-center w-full h-full absolute">
      <CircularProgress></CircularProgress>
    </div>
  );
};

export default Loader;
