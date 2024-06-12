import React from 'react';
import Table from '..';
import Text from '@components/shared/text';
import ContactInfo from '../contact-info';
import Edit from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import TooltipComponent from '@components/shared/tooltip';
import { useRouter } from 'next/router';
import { getSource } from '@global/functions';

const OtherTable = ({ data, handleAction, handleCardEdit }) => {
  const router = useRouter();
  return (
    <>
      {data?.length ? (
        <Table>
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center">
                Contact
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-xs font-medium uppercase  text-left tracking-wide text-gray-500">
                Contact summary
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-xs font-medium uppercase  text-left tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className=" bg-white">
            {data.map((dataItem, index) => (
              <tr
                key={dataItem.id}
                className={`hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200`}
                onClick={() =>
                  router.push({
                    pathname: '/contacts/details',
                    query: { id: dataItem?.id },
                  })
                }>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 flex items-center ">
                  <ContactInfo
                    data={{
                      name: dataItem?.first_name + ' ' + dataItem?.last_name,
                      email: dataItem?.email,
                      image: dataItem?.profile_image_path,
                    }}
                  />
                </td>
                <td className="whitespace-nowrap px-3 py-4  text-sm text-gray-500 text-left ">
                  {dataItem.summary !== null && (
                    <TooltipComponent
                      side={'bottom'}
                      align={'center'}
                      triggerElement={
                        <div
                          className={
                            'max-w-[239px] leading-5 text-left font-medium text-[11px] px-3 py-0.5 mt-1.5 text-ellipsis overflow-hidden bg-lightBlue1 text-lightBlue3 '
                          }>
                          {dataItem.summary}
                        </div>
                      }>
                      <div className={`w-[260px] pointer-events-none text-white bg-neutral1 rounded-lg`}>
                        <p className="text-xs leading-4 font-normal">{dataItem.summary}</p>
                      </div>
                    </TooltipComponent>
                  )}
                </td>
                <td className={'flex pb-[19px] '}>
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
                        className="group/edit cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-lightBlue2  mr-2 flex items-center justify-center">
                        <Edit className="group-hover/edit:text-lightBlue5 text-gray3 w-4 h-4" />
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
                          handleAction(dataItem);
                        }}
                        className=" h-7 w-7  group bg-gray2  hover:bg-gray6  mr-2 flex items-center justify-center hover:text-[#0284C7 cursor-pointer rounded-full bg-gray2 hover:bg-gray2 flex items-center justify-center relative">
                        <Delete className="text-gray3 w-4 h-4 group-hover:text-white" />
                      </div>
                    }>
                    <p className=" text-xs font-medium text-white"> Move to trash</p>
                  </TooltipComponent>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-[490px] max-w-[390px] mx-auto my-0">
          <Text h3 className="text-gray7 mb-2 mt-4 text-center">
            No results have been found!
          </Text>
        </div>
      )}
    </>
  );
};

export default OtherTable;
