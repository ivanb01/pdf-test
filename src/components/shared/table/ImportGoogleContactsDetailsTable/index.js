import React from 'react';
import { getInitials } from 'global/functions';
import { useState } from 'react';
import Error from '@mui/icons-material/Error';

const ImportGoogleContactsDetailsTable = ({ data }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <thead className="bg-gray-50 overflow-x-hidden sticky z-10 top-0">
        <tr>
          <th
            // scope="col"
            className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center">
            Contact
          </th>
        </tr>
      </thead>
      <tbody className=" bg-white overflow-y-auto">
        {!data.length ? (
          <tr className="h-[233px] text-center align-middle">
            <td className="text-center align-middle text-gray-400 text-sm italic">
              <div className="">No Contacts imported</div>
            </td>
          </tr>
        ) : (
          data.map((dataItem, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <div className="flex items-center justify-between">
                  {dataItem.details ? (
                    <div className="flex items-center relative">
                      <div className="font-medium text-gray7">{dataItem.details}</div>
                    </div>
                  ) : (
                    <div className="flex items-center relative">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-500 rounded-full">
                        {dataItem.image && dataItem.image !== null ? (
                          <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-400" src={dataItem.image} />
                        ) : (
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
                            <span className="text-sm font-medium leading-none sss text-white">
                              {getInitials(dataItem.first_name + ' ' + dataItem.last_name).toUpperCase()}
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="ml-3 flex flex-col">
                        <div className={`font-medium text-gray7 flex`}>
                          <p>{dataItem?.first_name}</p>
                        </div>
                        <p className={'text-gray-500 font-medium'}>{dataItem?.email}</p>
                      </div>
                    </div>
                  )}
                  {tableFor == 'import-google-contacts-failed' && (
                    <div className="flex items-center justify-center">
                      <Error className="h-5 w-5 text-red4 mr-2" />
                      <div className="text-gray7 font-medium">{dataItem.reason ?? ''}</div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </>
  );
};

export default ImportGoogleContactsDetailsTable;
