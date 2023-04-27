import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as contactServices from 'api/contacts';
import { dropped_status_id, trash_category_id } from 'global/variables';
import { useDispatch } from 'react-redux';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';

const DeleteClientOverlay = ({ title, handleCloseOverlay, contact }) => {
  const dispatch = useDispatch();
  const [loadingButton, setLoadingButton] = useState(false);

  const router = useRouter();
  const handleSubmit = async () => {
    setLoadingButton(true);
    try {
      const res = await contactServices.updateContact(contact?.id, {
        // status_id: dropped_status_id,
        category_id: trash_category_id,
      });
      contact?.category_1 == 'Client' && router.push('/contacts/clients');
      contact?.category_1 == 'Professional' &&
        router.push('/contacts/professionals');
      setLoadingButton(false);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };
  return (
    <Overlay handleCloseOverlay={handleCloseOverlay} className="max-w-[512px]">
      <div className="p-[24px] pt-0">
        <div className="flex flex-row">
          <div className="rounded-3xl	bg-red2 h-[40px] w-[40px] flex items-center justify-center">
            <ExclamationIcon className="text-red3" height={20} />
          </div>
          <div className="flex flex-col ml-2">
            <Text h3>No longer working with this contact?</Text>
            <Text p className="text-gray4 ">
              Moving the contact to Trash will no longer be part of your contact list.
            </Text>
          </div>
        </div>
        <div className="flex flex-row justify-end mt-4">
          <Button
            onClick={handleCloseOverlay}
            label="Cancel"
            white
            className="mr-2"
          />
          <Button loading={loadingButton} onClick={handleSubmit} label="Move to Trash" danger />
        </div>
      </div>
    </Overlay>
  );
};

export default DeleteClientOverlay;
