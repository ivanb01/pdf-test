import Overlay from 'components/shared/overlay';
import Radio from 'components/shared/radio';
import { useState } from 'react';
import StatusSelect from 'components/status-select';
import Button from 'components/shared/button';
import * as contactServices from 'api/contacts';
import { contactCategoryOptions } from 'global/variables';
import ChangeStatus from 'components/overlays/change-contact-status';
import { unassignContactFromCampaign } from 'api/campaign';
import { useDispatch } from 'react-redux';
import { setRefetchData } from 'store/global/slice';

const UpdateCategoryType = ({
  handleClose,
  contact,
  categoryTypes,
  statuses,
}) => {
  const dispatch = useDispatch();
  const [selectedContactType, setSelectedContactType] = useState(
    contact?.category_id,
  );
  const [selectedStatus, setSelectedStatus] = useState(contact?.status_id);
  const [loadingButton, setLoadingButton] = useState(false);

  const [changeStatusModal, setChangeStatusModal] = useState(false);

  const editContact = async () => {
    setLoadingButton(true);
    try {
      const contactToEdit = {
        category_id: selectedContactType,
        status_id: selectedStatus,
      };
      await contactServices.updateContact(contact?.id, contactToEdit);
      setLoadingButton(false);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        contact?.is_in_campaign === 'assigned' &&
        (contact?.status_id !== selectedStatus ||
          contact?.category_id !== selectedContactType)
      ) {
        setChangeStatusModal(true);
      } else {
        await editContact();
        dispatch(setRefetchData(true));
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatusAndCampaign = async () => {
    try {
      await unassignContactFromCampaign(contact.campaign_id, contact.id);
      await editContact();
      dispatch(setRefetchData(true));
      handleClose();
      setChangeStatusModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Overlay
        title="Edit Type"
        handleCloseOverlay={handleClose}
        className="w-auto min-w-[635px] max-w-[730px]"
      >
        <div className="p-5 pt-0">
          <div className="flex flex-col my-2">
            <div>
              <Radio
                options={categoryTypes}
                label="What kind of contact is this for you?"
                selectedOption={selectedContactType}
                setSelectedOption={setSelectedContactType}
                className="mb-6"
              />
              <StatusSelect
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                label="In what stage of communication?"
                statuses={statuses}
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-row justify-end mt-5">
                <Button
                  className="mr-3 "
                  white
                  label="Cancel"
                  onClick={handleClose}
                />
                <Button
                  type="submit"
                  primary
                  label="Save Changes"
                  loading={loadingButton}
                  // onClick={() => {
                  //   setLoadingButton(true);
                  // }}
                />
              </div>
            </form>
          </div>
        </div>
      </Overlay>

      {changeStatusModal && (
        <ChangeStatus
          handleCloseOverlay={() => setChangeStatusModal(false)}
          onSubmit={handleChangeStatusAndCampaign}
        />
      )}
    </>
  );
};

export default UpdateCategoryType;
