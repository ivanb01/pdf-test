import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import * as contactServices from 'api/contacts';
import { dropped_status_id } from 'global/variables';
import { useDispatch } from 'react-redux';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';

const DeleteClientOverlay = ({ title, handleCloseOverlay, contact }) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const res = await contactServices.updateContact(contact?.id, {
        status_id: dropped_status_id,
      });
      contact?.category_1 == 'Client' && router.push('/contacts/clients');
      contact?.category_1 == 'Professional' &&
        router.push('/contacts/professionals');
    } catch (error) {
      console.log(error);
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
              Move them to dropped and you wont engage with them further.
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
          <Button onClick={handleSubmit} label="Move to Trash" danger />
        </div>
      </div>
    </Overlay>
  );
};

export default DeleteClientOverlay;
