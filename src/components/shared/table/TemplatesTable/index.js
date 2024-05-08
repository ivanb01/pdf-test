import React from 'react';
import { formatDateLL } from 'global/functions';
import Edit from '@mui/icons-material/Edit';
import { formatDateLThour } from 'global/functions';
import { Delete } from '@mui/icons-material';
import TooltipComponent from '@components/shared/tooltip';
import Table from '..';

const TemplatesTable = ({ data, setCurrentTemplate, setOpenEdit, setOpenDelete }) => {
  let isEmail = data?.length && data[0].body_text ? true : false;
  return (
    <Table>
      <thead>
        <tr className="bg-gray-50 text-gray-500" style={{ height: '60px' }}>
          <th
            // style={{ width: '400px' }}
            scope="col"
            className="pl-6 py-3 pr-2 text-left font-medium text-xs leading-4 tracking-wider"
          >
            TEMPLATE TITLE
          </th>
          <th scope="col" className="flex-grow py-3 px-2 text-left  text-xs leading-4 font-medium tracking-wider">
            {isEmail ? 'EMAIL' : 'SMS'}
          </th>
          <th scope="col" className="flex-grow py-3 px-2 text-center  text-xs leading-4 font-medium tracking-wider">
            CREATED DATE
          </th>
          <th
            scope="col"
            className="flex-grow pl-2 pr-6 py-3  text-center text-xs leading-4 font-medium tracking-wider"
          ></th>
        </tr>
      </thead>
      <tbody>
        {data.map((template) => (
          <tr
            key={template.id}
            className={'border-b border-gray-200 cursor-pointer hover:bg-lightBlue1 group'}
            style={{ height: '76px' }}
            onClick={() => {
              setCurrentTemplate(template);
              setOpenEdit(true);
            }}
          >
            <td className="pl-6 px-3 py-2 text-gray-800 text-left text-sm leading-5">
              {isEmail ? template.subject : template.name}
            </td>
            <td className="px-3 py-2 text-gray-800 text-left text-sm leading-5" style={{ width: '400px' }}>
              {isEmail
                ? template.body_text.replace(/<\/?[^>]+(>|$)|&[a-zA-Z0-9#]+;/g, '')
                : template.message.replace(/<\/?[^>]+(>|$)|&[a-zA-Z0-9#]+;/g, '')}
            </td>
            <td className="px-3 py-2 text-gray-800 text-center text-sm leading-5">
              {formatDateLL(template.created_at)}
              <span className="block text-gray-600">{formatDateLThour(template.created_at)}</span>
            </td>
            <td className="pl-3 pr-6 py-3 text-gray-500 text-right">
              <div className="flex items-center justify-end gap-6">
                <TooltipComponent
                  side={'top'}
                  align="center"
                  triggerElement={
                    <div
                      role={'button'}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentTemplate(template);
                        setOpenEdit(true);
                      }}
                      className=" h-6 w-6 cursor-pointer rounded-full bg-gray1 hover:bg-gray2 flex items-center justify-center relative"
                    >
                      <Edit className="text-gray3 w-4 h-4" />
                    </div>
                  }
                >
                  <p className=" text-xs font-medium text-white"> Edit Template</p>
                </TooltipComponent>
                <TooltipComponent
                  side={'top'}
                  align="center"
                  triggerElement={
                    <div
                      role={'button'}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentTemplate(template);
                        setOpenDelete(true);
                      }}
                      className=" h-6 w-6 cursor-pointer rounded-full bg-gray1 hover:bg-gray2 flex items-center justify-center relative"
                    >
                      <Delete className="group-hover/delete:text-white text-[16px] text-gray3" />
                    </div>
                  }
                >
                  <p className=" text-xs font-medium text-white"> Delete Template</p>
                </TooltipComponent>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TemplatesTable;
