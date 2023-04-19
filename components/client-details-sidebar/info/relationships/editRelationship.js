import { useEffect, useState } from 'react';
import Text from 'components/shared/text';
import Avatar from 'components/shared/avatar';
import Overlay from 'components/shared/overlay';
import Button from 'components/shared/button';
import Dropdown from 'components/shared/dropdown';
import * as contactServices from 'api/contacts';
import { relationshipsTypes } from 'global/variables';

const EditRelationshipModal = ({
  handleClose,
  contactId,
  relationship,
  handleFetchRelationships,
}) => {
  const [relationshipTypeToEdit, setRelationshipTypeToEdit] = useState(
    relationship.relationship_name
  );
  const handleRelationshipType = (relationshipType) => {
    setRelationshipTypeToEdit(relationshipType.name);
  };
  const [loadingButton, setLoadingButton] = useState(false);

  const editRelationship = async () => {
    setLoadingButton(true);
    try {
      const relationshipEdit = {
        relationship_name: relationshipTypeToEdit,
      };
      const { data } = await contactServices.updateContactRelationship(
        contactId,
        relationship.relationship_id,
        relationshipEdit
      );
      setLoadingButton(false);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await editRelationship();
    handleFetchRelationships();
    handleClose();
  };

  return (
    <Overlay
      title="Edit Relationship"
      handleCloseOverlay={handleClose}
      className="w-[632px]"
    >
      <div className="p-5 pt-0">
        <div className="flex flex-col my-2">
          <div className="flex flex-row p-3 bg-gray-50 group">
            <Avatar
              size="w-8 h-8"
              className="mr-4"
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            />
            <div className="flex flex-row justify-between w-[100%]">
              <div className="flex flex-col">
                <Text className="text-gray6" h4>
                  {`${relationship.first_name} ${relationship.last_name}`}
                </Text>
                <Text className="text-gray4" p>
                  {relationship.email}
                </Text>
              </div>
              <div className="flex flex-row items-center">
                <Dropdown
                  placeHolder="Choose Type*"
                  activeIcon={false}
                  options={relationshipsTypes}
                  className="mb-1 w-52"
                  activeClasses="bg-lightBlue1"
                  handleSelect={(relationshipType) =>
                    handleRelationshipType(relationshipType)
                  }
                  initialSelect={relationshipTypeToEdit}
                ></Dropdown>
              </div>
            </div>
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
                label="Save"
                loading={loadingButton}
              />
            </div>
          </form>
        </div>
      </div>
    </Overlay>
  );
};

export default EditRelationshipModal;
