import Text from 'components/shared/text';
import Chip from 'components/shared/chip';
import FilterDropdown from 'components/shared/dropdown/FilterDropdown';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { PlusIcon, PencilIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import UpdateCategoryType from './updateCategoryType';
import AddProfile from './addProfile';
import {
  clientStatuses,
  professionalsStatuses,
  clientOptions,
  professionalsOptions,
} from 'global/variables';
import * as contactServices from 'api/contacts';
import { useRouter } from 'next/router';

export default function CategoryTypes({ client, handleFetchContactRequired }) {
  const router = useRouter();

  const [editModal, setEditModal] = useState(false);
  const handleCloseEditModal = () => {
    setEditModal(false);
  };

  const [addModal, setAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setAddModal(false);
  };

  const types = [
    {
      name: (
        <span className="flex flex-row">
          <PencilIcon height={20} className="text-gray6 mr-3" />
          <Text p className="text-gray6">
            Edit Type
          </Text>
        </span>
      ),
      handleClick: () => setEditModal(true),
    },
    {
      name: (
        <span className="flex flex-row">
          <PlusIcon height={20} className="text-gray6 mr-3" />
          <Text p className="text-gray6">
            Add Additional Type
          </Text>
        </span>
      ),
      handleClick: () => setAddModal(true),
    },
  ];

  const categoryTypes =
    client.category_1 == 'Client' ? clientOptions : professionalsOptions;
  const contactStatuses =
    client.category_1 == 'Client' ? clientStatuses : professionalsStatuses;

  const [contactProfiles, setContactProfiles] = useState([]);
  const [fetchProfilesRequired, setFetchProfilesRequired] = useState(false);
  const handleFetchProfilesRequired = () => {
    setFetchProfilesRequired((prev) => !prev);
  };

  const fetchProfiles = async () => {
    try {
      const { data } = await contactServices.getContactProfiles(client?.id);
      const allProfiles = data.data;
      console.log('api profiles', data.data, client?.id);

      allProfiles.unshift(client);
      console.log('all profiles', allProfiles, client?.id);
      setContactProfiles(allProfiles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfilesRequired]);

  return (
    <>
      <div className="pb-[16px] flex flex-row justify-items-center items-center">
        {console.log(contactProfiles)}
        <div
          className={`flex flex-row ${
            contactProfiles.length > 1 && 'bg-gray1'
          } rounded-lg px-3 py-1.5 w-[100%]`}
        >
          {
            //  contactProfiles.length > 0 && contactProfiles.map((profile) => <Chip secondary key={profile?.id} label={profile?.category_2} />)
            contactProfiles.length > 0 &&
              contactProfiles.map((profile) => (
                <div
                  onClick={() =>
                    router.push({
                      pathname: '/contacts/details',
                      query: { id: profile.id },
                    })
                  }
                  key={profile?.id}
                  className={`${
                    profile.id === client.id
                      ? 'bg-white border border-borderColor'
                      : 'bg-gray1'
                  }
                     hover:bg-white transition-all inline-flex items-center justify-center px-4 py-2 cursor-pointer rounded-lg text-[#474D66] mr-2 text-xs font-medium`}
                >
                  {profile?.category_2}
                </div>
              ))
          }
        </div>
        {/* <div className="flex flex-row">
                    {
                    content.map((chip) => <Chip secondary key={chip} label={chip} />)
                    }
                </div> */}

        <div className="ml-auto mr-4">
          <FilterDropdown
            types={types}
            icon={<DotsVerticalIcon height={20} />}
          />
        </div>
      </div>
      {editModal && (
        <UpdateCategoryType
          handleClose={handleCloseEditModal}
          contact={client}
          categoryTypes={categoryTypes}
          statuses={contactStatuses}
          handleFetchContactRequired={handleFetchContactRequired}
        />
      )}
      {addModal && (
        <AddProfile
          handleClose={handleCloseAddModal}
          contactId={client.id}
          categoryTypes={categoryTypes}
          statuses={contactStatuses}
          handleFetchProfilesRequired={handleFetchProfilesRequired}
        />
      )}
    </>
  );
}
