import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const FilesCell = ({ info }) => (
  <div className="min-w-[120px] flex justify-center px-6">
    {info.getValue().length ? (
      <div className="flex items-center gap-1">
        <CheckCircleIcon className="w-5 h-5 text-green5" />
        Yes
      </div>
    ) : (
      <div className="flex items-center gap-1">
        <RemoveCircleIcon className="h-5 w-5 text-overlayBackground" />
        No
      </div>
    )}
  </div>
);
