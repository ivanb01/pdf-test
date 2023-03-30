import { useEffect, useState } from 'react';
import {
  PlusCircleIcon,
  PencilIcon,
  MinusCircleIcon,
} from '@heroicons/react/solid';
import Text from 'components/shared/text';
import Avatar from 'components/shared/avatar';
import AddRelationshipModal from './addRelationship';
import EditRelationshipModal from './editRelationship';
import * as contactServices from 'api/contacts';

export default function Relationships({ contactId }) {
  const [relationships, setRelationships] = useState([]);
  const [relationshipToEdit, setRelationshipToEdit] = useState(null);

  const [fetchRelationshipsRequired, setFetchRelationshipsRequired] =
    useState(false);
  const handleFetchRelationshipsRequired = () => {
    setFetchRelationshipsRequired((prev) => !prev);
  };

  const [addModal, setAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setAddModal(false);
  };
  const [editModal, setEditModal] = useState(false);
  const handleCloseEditModal = () => {
    setEditModal(false);
  };

  const fetchContactRelationships = async () => {
    try {
      const { data } = await contactServices.getContactRelationships(contactId);
      setRelationships(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContactRelationships();
  }, [fetchRelationshipsRequired, contactId]);

  const handleDeleteRelationship = async (id) => {
    try {
      await contactServices.deleteContactRelationship(contactId, id);
      handleFetchRelationshipsRequired();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col my-3">
        <div className="flex flex-row">
          <Text className="text-gray4 mr-1" h4>
            Relationship(s)
          </Text>
          <div className="group relative cursor-pointer">
            <PlusCircleIcon
              className="text-gray3"
              height={20}
              onClick={() => setAddModal(true)}
            />
            <div className="group-hover:opacity-100 opacity-0 inline-block absolute z-10 py-2 px-3 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700">
              Add Relationship
            </div>
          </div>
        </div>
        <div className="flex flex-col my-2">
          {relationships.length < 1 ? (
            <Text className="text-gray7 italic pl-3" p>
              No relationship
            </Text>
          ) : (
            relationships.map((relationship) => (
              <div
                key={relationship.relationship_id}
                className="flex flex-row p-3 mr-6 hover:bg-lightBlue1 group"
              >
                <Avatar
                  size="w-8 h-8"
                  className="mr-4"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />
                <div className="flex flex-row justify-between w-[100%]">
                  <div className="flex flex-col">
                    <Text className="text-gray6" h4>
                      {`${relationship.first_name} ${relationship.last_name}`}
                    </Text>
                    <Text className="text-gray4" p>
                      {relationship.relationship_name}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center">
                    <MinusCircleIcon
                      onClick={() =>
                        handleDeleteRelationship(relationship.relationship_id)
                      }
                      className="cursor-pointer text-gray3 hover:text-red4 m-2 opacity-0 group-hover:opacity-100"
                      height={20}
                    />
                    <div className="grupet relative cursor-pointer opacity-0 group-hover:opacity-100">
                      <PencilIcon
                        onClick={() => {
                          setEditModal(true);
                          setRelationshipToEdit(relationship);
                        }}
                        className="text-gray3 hover:text-gray5"
                        height={20}
                      />
                      <div className="grupet-hover:opacity-100 opacity-0 inline-block absolute z-10 py-2 px-3 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700">
                        Edit Relationship
                      </div>
                    </div>
                    {/* <PencilIcon  data-tooltip-target="tooltip-edit-relationship'" onClick={() => setEditModal(true)} className="cursor-pointer text-gray3 hover:text-gray5 opacity-0 group-hover:opacity-100" height={20} />
                        <div
                            id="tooltip-edit-relationship"
                            role="tooltip"
                            className="inline-block absolute invisible z-10 py-2 px-3 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                            >
                            Edit Relationship
                        </div> */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {addModal && (
        <AddRelationshipModal
          handleClose={handleCloseAddModal}
          contactId={contactId}
          handleFetchRelationships={handleFetchRelationshipsRequired}
        />
      )}
      {editModal && (
        <EditRelationshipModal
          handleClose={handleCloseEditModal}
          contactId={contactId}
          relationship={relationshipToEdit}
          handleFetchRelationships={handleFetchRelationshipsRequired}
        />
      )}
    </>
  );
}
