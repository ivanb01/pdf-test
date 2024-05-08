import Button from 'components/shared/button';
import Overlay from 'components/shared/overlay';
import PropTypes from 'prop-types';
import { ExclamationIcon } from '@heroicons/react/outline';

const DeleteForm = ({ onCancel, onDelete }) => {
  return (
    <Overlay
      className="min-w-[600px] min-h-[332px] [&>div]:overflow-visible"
      title={
        <>
          <div className="flex gap-4">
            <div className="rounded-3xl	bg-red2 h-[40px] w-[40px] flex items-center justify-center">
              <ExclamationIcon className="text-red3" height={20} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-lg font-medium leading-6 text-gray7">Move to Trash</span>
              <span className="text-sm leading-5 text-gray4">Are you sure you want to Move to Trash?</span>
            </div>
          </div>
        </>
      }
      handleCloseOverlay={onCancel}
    >
      <div className="p-[24px] pt-0 flex flex-col gap-[24px]">
        <div className="flex justify-end gap-[17px]">
          <div className="flex flex-row justify-end gap-3">
            <Button onClick={onCancel} label="Cancel" white className={'min-w-fit'} />
            <Button onClick={onDelete} label="Move to Trash" danger className={'min-w-fit'} />
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default DeleteForm;

DeleteForm.propTypes = {
  formId: PropTypes.number,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
};
