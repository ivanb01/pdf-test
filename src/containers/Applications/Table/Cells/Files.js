import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const FilesCell = ({ info }) => (
  <div className="min-w-[120px] flex justify-center px-6">
    {info.getValue().length ? (
      <CheckCircleIcon className="w-5 h-5 text-green5" />
    ) : (
      <RemoveCircleIcon className="h-5 w-5 text-overlayBackground" />
    )}
  </div>
);
