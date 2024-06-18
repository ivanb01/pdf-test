import React from 'react';
import { formatDateLL } from 'global/functions';
import Edit from '@mui/icons-material/Edit';
import { formatDateLThour } from 'global/functions';
import { Delete } from '@mui/icons-material';
import TooltipComponent from '@components/shared/tooltip';
import Table from '..';

const TemplatesTable = ({ data, setCurrentTemplate, setOpenEdit, setOpenDelete, isInCampaign }) => {
  let isEmail = data?.length && data[0].body_text ? true : false;

  function truncateText(text, maxLength = 170) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  return (
    <Table isInCampaign>
      <thead>
        <tr className={`bg-gray-50 text-gray-500 `} style={{ height: '60px' }}>
          <th scope="col" className="pl-6 py-3 pr-2 text-left font-medium text-xs leading-4 tracking-wider">
            TEMPLATE TITLE
          </th>
          <th scope="col" className="flex-grow py-3 px-2 text-left  text-xs leading-4 font-medium tracking-wider">
            {isEmail ? 'EMAIL' : 'SMS'}
          </th>
          <th
            scope="col"
            className="flex-grow py-3 px-2 text-center  text-xs leading-4 font-medium tracking-wider md:w-[200px]">
            CREATED DATE
          </th>
          {!isInCampaign && (
            <th
              scope="col"
              className="flex-grow pl-2 pr-6 py-3  text-center text-xs leading-4 font-medium tracking-wider"></th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((template) => (
          <tr
            key={template.id}
            className={`border-gray-200 cursor-pointer hover:bg-lightBlue1 group ${isInCampaign ? 'last:border-0 border-b' : 'border-b'} `}
            style={{ height: '76px', maxHeight: '120px' }}
            onClick={() => {
              if (!isInCampaign) {
                setCurrentTemplate(template);
                setOpenEdit(true);
              }
            }}>
            <td
              className="pl-6 px-3 py-2 text-gray-800 text-left leading-5 font-medium text-sm"
              style={{ width: '320px' }}>
              {isEmail ? template.subject : template.name}
            </td>
            <td className="px-3 py-2 text-left text-sm leading-5 md:w-[400px] lg:w-[600px] overflow-ellipsis break-word w-full overflow-hidden ">
              <p className={'text-sm leading-5 font-medium text-gray7'} style={{ fontWeight: 600 }}>
                Subject:
              </p>
              <div className={'text-gray4 text-sm leading-8 font-normal '}>
                {isEmail
                  ? truncateText(template.body_text.replace(/<\/?[^>]+(>|$)|&[a-zA-Z0-9#]+;/g, ''))
                  : truncateText(template.message.replace(/<\/?[^>]+(>|$)|&[a-zA-Z0-9#]+;/g, ''))}
              </div>
            </td>
            <td className="px-3 py-2 text-gray7 text-center text-sm leading-5 min-w-[200px]">
              {formatDateLL(template.created_at)}
              <span className="block text-gray-600 ">{formatDateLThour(template.created_at)}</span>
            </td>
            {!isInCampaign && (
              <td className="pl-3 pr-6 py-3 text-gray-500 text-right">
                <div className="flex items-center justify-end gap-6">
                  <TooltipComponent
                    side={'top'}
                    align="center"
                    triggerElement={
                      <div
                        role={'button'}
                        onClick={(e) => {
                          if (!isInCampaign) {
                            e.stopPropagation();
                            setCurrentTemplate(template);
                            setOpenEdit(true);
                          }
                        }}
                        className=" h-6 w-6 cursor-pointer rounded-full bg-gray1 hover:bg-gray2 flex items-center justify-center relative">
                        <Edit className="text-gray3 w-4 h-4" />
                      </div>
                    }>
                    <p className=" text-xs font-medium text-white"> Edit Template</p>
                  </TooltipComponent>
                  <TooltipComponent
                    side={'top'}
                    align="center"
                    triggerElement={
                      <div
                        role={'button'}
                        onClick={(e) => {
                          if (!isInCampaign) {
                            e.stopPropagation();
                            setCurrentTemplate(template);
                            setOpenDelete(true);
                          }
                        }}
                        className=" h-6 w-6 cursor-pointer rounded-full bg-gray1 hover:bg-gray2 flex items-center justify-center relative">
                        <Delete className="group-hover/delete:text-white text-[16px] text-gray3" />
                      </div>
                    }>
                    <p className=" text-xs font-medium text-white"> Delete Template</p>
                  </TooltipComponent>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TemplatesTable;
