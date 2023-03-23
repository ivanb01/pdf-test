import Overlay from 'components/shared/overlay';
import Radio from 'components/shared/radio';
import { useState } from 'react';
import StatusSelect from 'components/status-select';
import Button from 'components/shared/button';
import * as contactServices from 'api/contacts';
import { contactCategoryOptions } from 'global/variables';

const UpdateCategoryType = ({
  handleClose,
  contact,
  categoryTypes,
  statuses,
  handleFetchContactRequired,
}) => {
  const [selectedContactType, setSelectedContactType] = useState(
    contact.category_id
  );
  const [selectedStatus, setSelectedStatus] = useState(contact.status_id);
  const [loadingButton, setLoadingButton] = useState(false);

  const editContact = async () => {
    try {
      const contactToEdit = {
        category_id: selectedContactType,
        status_id: selectedStatus,
      };
      await contactServices.updateContact(contact.id, contactToEdit);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await editContact();
    handleFetchContactRequired();
    handleClose();
  };

  return (
    <Overlay
      title="Edit Type"
      handleCloseOverlay={handleClose}
      className="w-[50%]"
    >
      <div className="p-5 pt-0">
        <div className="flex flex-col my-2">
          <div>
            <Radio
              options={categoryTypes}
              label="What kind of contact is this for you?"
              selectedContactType={selectedContactType}
              changeContactType={setSelectedContactType}
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
                onClick={() => {
                  setLoadingButton(true);
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </Overlay>
  );
};

export default UpdateCategoryType;
