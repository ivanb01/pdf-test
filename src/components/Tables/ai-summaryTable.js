import ContactInfo from '@components/shared/table/contact-info';
import Chip from '@components/shared/chip';
import { formatDateStringMDY, getContactStatusByStatusId, getContactStatusColorByStatusId } from '@global/functions';
import Launch from '@mui/icons-material/Launch';
import TooltipComponent from '@components/shared/tooltip';
import { CheckCircle, Delete } from '@mui/icons-material';
import Edit from '@mui/icons-material/Edit';
import React, { useEffect } from 'react';

const AISummaryTable = (
  handleFilteredContacts,
  undoAllCategorizations,
  setCurrentButton,
  undoCategorization,
  data,
  status_2,
  handleSelectAll,
  handleSelectContact,
  showCategorize,
  handleClickRow,
  tableFor,
  handleAction,
  categoryType,
  handleCardEdit,
  currentButton,
  setCurrentEvent,
  searchTerm,
  campaignId,
  setCampaignId,
  titleLabel,
  checkbox,
  checked,
  toggleAll,
  selectedPeople,
  setSelectedPeople,
  status,
  contacts,
) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  const getChip = (item) => {
    console.log(item, 'item');
    if (item.category_id == 3) {
      return 'Trash';
    }
    if (item.category_1 == 'Professional') {
      if (vendorSubtypes.map((type) => type.id)) {
        return item.category_2;
      }
    } else {
      return item.category_1;
    }
  };
  // const getSubtype = (item) => {
  //   if (item.category_1 == 'Professional') {
  //     return [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].includes(item.category_id)
  //       ? ' - ' + findProfessionalSubtype(item.category_id)
  //       : ' - ' + item.category_2;
  //   } else {
  //     return;
  //   }
  // };
  return (
    <>
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="h-[56px] py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center w-[300px]">
            <input
              type="checkbox"
              className="h-4 w-4 mr-4 rounded border-gray-300 text-lightBlue3 focus:ring-lightBlue3"
              ref={checkbox && checkbox}
              checked={checked}
              onChange={toggleAll}
            />
            Contact
          </th>
          <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            Type
          </th>
          <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            Status
          </th>
          <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 ">
            Email Summary
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 w-[150px]">
            Imported Date
          </th>
          <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            Actions
          </th>
          <th
            scope="col"
            className="px-3 pr-1 text-center text-xs font-medium uppercase tracking-wide text-gray-500"></th>
        </tr>
      </thead>
      <tbody className=" bg-white">
        {data?.map((dataItem, index) => (
          <tr
            key={dataItem.index}
            className="hover:bg-lightBlue1 cursor-pointer contact-row group bg-white group border-b border-gray-200"
            // onClick={(event) => handleClickRow(contact, event)}
            onClick={(e) => {
              if (e.target.type === 'checkbox') return;
              handleCardEdit(dataItem);
            }}>
            {/* onClick={(event) => handleClickRow(dataItem, event)}> */}
            <td className="whitespace-nowrap py-4 text-sm pl-6 flex items-center">
              <input
                type="checkbox"
                className="mr-4 h-4 w-4 rounded border-gray-300 text-lightBlue3 focus:ring-lightBlue3"
                value={dataItem.email}
                checked={selectedPeople.includes(dataItem)}
                onChange={(e) =>
                  setSelectedPeople(
                    e.target.checked ? [...selectedPeople, dataItem] : selectedPeople.filter((p) => p !== dataItem),
                  )
                }
              />
              <ContactInfo
                data={{
                  // name: `${dataItem.first_name + ' ' + dataItem.last_name}`,
                  name: `${dataItem.first_name} ${dataItem.last_name}`,
                  id: dataItem.id,
                  email: dataItem.email,
                  // image: dataItem.profile_image_path,
                }}
                maxWidth={'300px'}

                // handleSelect={(e, dataItem) =>
                //   handleSelectContact(e, dataItem)
                // }
                // handleAction={(id, action) => handleAction(id, action)}
              />
            </td>

            <td className="max-w-[150px] text-left px-3 py-4 text-sm text-gray-500 type-and-status">
              <Chip className="break-words" typeStyle>
                {dataItem?.category_2}
              </Chip>
            </td>
            <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
              <Chip statusStyle className={getContactStatusColorByStatusId(dataItem.category_id, dataItem.status_id)}>
                {getContactStatusByStatusId(dataItem.category_id, dataItem.status_id)}
              </Chip>
            </td>
            <td className=" text-left px-3 py-4 text-sm text-gray-500 type-and-status">
              <div className=" flex items-center break-all">
                {dataItem.summary && (
                  <a href={dataItem.email_link} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer">
                    <Launch className="h-5 w-5 text-blue-500 mr-2" />
                  </a>
                )}
                {dataItem.summary ? <div className="email-summary-styling">{dataItem.summary}</div> : '-'}
              </div>
            </td>
            <td className=" text-left px-3 py-4 text-sm text-gray-500 type-and-status">
              {formatDateStringMDY(dataItem.created_at)}
            </td>

            <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-6">
                <TooltipComponent
                  side={'top'}
                  align="center"
                  triggerElement={
                    <div
                      role={'button'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction('approve', dataItem);
                      }}
                      className="transition-all rounded-[4px] cursor-pointer hover:bg-green-500 hover:text-white bg-green-50 text-green-500 w-7 h-7 flex items-center justify-center relative">
                      <CheckCircle
                        id={'edit-contact-icon-' + dataItem.id}
                        className="group-hover/check:text-white text-[16px]"
                      />
                    </div>
                  }>
                  <p className=" text-xs font-medium text-white">Mark as Correct</p>
                </TooltipComponent>
                <TooltipComponent
                  side={'top'}
                  align="center"
                  triggerElement={
                    <div
                      role={'button'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardEdit(dataItem);
                      }}
                      className=" h-6 w-6 cursor-pointer rounded-full bg-gray1 hover:bg-gray2 flex items-center justify-center relative">
                      <Edit className="text-gray3 w-4 h-4" />
                    </div>
                  }>
                  <p className=" text-xs font-medium text-white"> Edit Contact</p>
                </TooltipComponent>
                <TooltipComponent
                  side={'top'}
                  align="center"
                  triggerElement={
                    <div
                      role={'button'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction('delete', dataItem);
                      }}
                      className=" transition-all rounded-[4px] cursor-pointer hover:bg-red-500 hover:text-white bg-red-50 text-[#ff6d6d] w-7 h-7 flex items-center justify-center relative">
                      <Delete className="group-hover/delete:text-white text-[16px]" />
                    </div>
                  }>
                  <p className=" text-xs font-medium text-white"> Move to trash</p>
                </TooltipComponent>
              </div>
            </td>
            <td className="pr-1"></td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

const AITable = (
  handleFilteredContacts,
  undoAllCategorizations,
  setCurrentButton,
  undoCategorization,
  data,
  status_2,
  handleSelectAll,
  handleSelectContact,
  showCategorize,
  handleClickRow,
  tableFor,
  handleAction,
  categoryType,
  handleCardEdit,
  currentButton,
  setCurrentEvent,
  searchTerm,
  campaignId,
  setCampaignId,
  titleLabel,
  checkbox,
  checked,
  toggleAll,
  selectedPeople,
  setSelectedPeople,
  status,
  contacts,
) => {
  return (
    <div className="h-full ">
      <div className="h-full flex flex-col">
        <div className={`h-full  overflow-x-auto`}>
          <div className="h-full inline-block min-w-full align-middle">
            <div className="ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-200">
                {AISummaryTable(
                  handleFilteredContacts,
                  undoAllCategorizations,
                  setCurrentButton,
                  undoCategorization,
                  data,
                  status_2,
                  handleSelectAll,
                  handleSelectContact,
                  showCategorize,
                  handleClickRow,
                  tableFor,
                  handleAction,
                  categoryType,
                  handleCardEdit,
                  currentButton,
                  setCurrentEvent,
                  searchTerm,
                  campaignId,
                  setCampaignId,
                  titleLabel,
                  checkbox,
                  checked,
                  toggleAll,
                  selectedPeople,
                  setSelectedPeople,
                  status,
                  contacts,
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITable;
