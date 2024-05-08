import Text from 'components/shared/text';
import FilterDropdown from 'components/shared/dropdown/FilterDropdown';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { PlusIcon, PencilIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import UpdateCategoryType from 'components/overlays/update-category-type';
import UpdateTypeStatus from 'components/overlays/update-type-status';
import AddProfile from 'components/overlays/add-profile';
import { clientStatuses, professionalsStatuses, clientOptions, professionalsOptions } from 'global/variables';
import * as contactServices from 'api/contacts';
import { useRouter } from 'next/router';
import Chip from 'components/shared/chip';

export default function CategoryTypes({ client }) {
  const router = useRouter();

  const [loadingProfiles, setLoadingProfiles] = useState(false);
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
    // {
    //   name: (
    //     <span className="flex flex-row">
    //       <PlusIcon height={20} className="text-gray6 mr-3" />
    //       <Text p className="text-gray6">
    //         Add Additional Type
    //       </Text>
    //     </span>
    //   ),
    //   handleClick: () => setAddModal(true),
    // },
  ];

  const categoryTypes = client?.category_1 == 'Client' ? clientOptions : professionalsOptions;
  const contactStatuses = client?.category_1 == 'Client' ? clientStatuses : professionalsStatuses;

  const [contactProfiles, setContactProfiles] = useState([]);
  const [fetchProfilesRequired, setFetchProfilesRequired] = useState(false);
  const handleFetchProfilesRequired = () => {
    setFetchProfilesRequired((prev) => !prev);
  };

  const fetchProfiles = async () => {
    try {
      const { data } = await contactServices.getContactProfiles(client?.id);
      const allProfiles = data?.data;
      allProfiles.unshift(client);
      setContactProfiles(allProfiles);
      setLoadingProfiles(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (client) {
      setLoadingProfiles(true);
      fetchProfiles();
    }
  }, [client, fetchProfilesRequired]);

  return (
    <>
      <div className="pl-[24px] py-[12px] flex flex-row justify-items-center items-center border-y border-gray-2">
        <div
          className={`flex flex-row ${
            contactProfiles.length > 1 ? 'bg-gray-50 rounded-lg px-3 py-1.5 w-[312px] overflow-scroll' : ''
          }`}
        >
          {contactProfiles.length > 1 ? (
            contactProfiles.map((profile) => (
              <div
                onClick={() =>
                  router.push({
                    pathname: '/contacts/details',
                    query: { id: profile?.id },
                  })
                }
                key={profile?.id}
                className={`${
                  profile?.id === client?.id
                    ? 'bg-white border border-borderColor text-gray-700'
                    : 'bg-gray-50 border border-gray-50 text-gray-500'
                }
                    hover:bg-white hover:border-borderColor transition-all cursor-pointer py-2 px-[15px] uppercase text-center rounded text-xs font-medium mr-2`}
              >
                {profile?.category_2}
              </div>
            ))
          ) : (
            <>
              {loadingProfiles ? (
                <div className="flex w-[60px] h-7 animate-pulse rounded-md bg-gray2"></div>
              ) : (
                <Chip key={contactProfiles[0]?.id} typeStyle>
                  {contactProfiles[0]?.category_2}
                </Chip>
              )}
            </>
            // <div
            //   key={contactProfiles[0]?.id}
            //   className={`bg-gray1 cursor-pointer py-2 px-[15px] uppercase text-[#474D66] text-center rounded text-xs font-medium`}
            // >
            //   {contactProfiles[0]?.category_2}
            // </div>
          )}
        </div>
        {/* <div className="ml-auto mr-4">
          <FilterDropdown types={types} icon={<DotsVerticalIcon height={20} />} />
        </div> */}
      </div>
      {editModal && (
        <UpdateTypeStatus contact={client} handleClose={() => setEditModal(false)} />
        // <UpdateCategoryType
        //   handleClose={handleCloseEditModal}
        //   contact={client}
        //   categoryTypes={categoryTypes}
        //   statuses={contactStatuses}
        // />
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
