import React from 'react';
import Table from '..';
import { getInitials, getDateFormat } from 'global/functions';
import RedoIcon from '@mui/icons-material/Redo';
import { useRouter } from 'next/router';

const TrashTable = ({ data, searchTerm, handleCardEdit }) => {
  const router = useRouter();
  return data.length > 0 ? (
    <Table>
      <thead>
        <tr className="bg-gray-50 text-gray-500" style={{ height: '60px' }}>
          <th
            style={{ width: '400px' }}
            scope="col"
            className="pl-6 py-3 pr-2 text-left text-xs leading-4 font-medium tracking-wider"
          >
            CLIENT
          </th>
          <th scope="col" className="flex-grow py-3 px-2 text-center text-xs leading-4 font-medium tracking-wider">
            MOVED IN TRASH
          </th>
          <th
            scope="col"
            className="flex-grow pl-2 pr-6 py-3  text-center text-xs leading-4 font-medium tracking-wider"
          ></th>
        </tr>
      </thead>
      <tbody>
        {data.map((person) => (
          <tr
            onClick={() =>
              router.push({
                pathname: '/contacts/details',
                query: { id: person?.id },
              })
            }
            key={person.id}
            className={'border-b border-gray-200 cursor-pointer hover:bg-lightBlue1 group'}
            style={{ height: '76px' }}
          >
            <td className=" pl-6 py-3 pr-2 " style={{ width: '400px' }}>
              <div className={'flex gap-4'}>
                <div>
                  {person.profile_image_path ? (
                    <img
                      className="inline-block h-10 w-10 rounded-full"
                      src={person.profile_image_path}
                      alt={person.first_name}
                    />
                  ) : (
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
                      <span className="text-sm font-medium leading-none text-white">
                        {getInitials(person.first_name + ' ' + person.last_name).toUpperCase()}
                      </span>
                    </span>
                  )}
                </div>
                <div>
                  <h6 className={'text-sm leading-5 font-medium text-gray-800 '}>
                    {person.first_name} {person.last_name}
                  </h6>
                  <h6 className={' text-sm leading-5 font-normal text-gray-500'}>{person.email}</h6>
                </div>
              </div>
            </td>

            <td className=" px-3 py-2 text-gray-800 text-center text-sm leading-5 font-medium">
              {getDateFormat(person.updated_at || person.created_at)}
            </td>
            <td className="pl-3 pr-6 py-3 text-gray-500 text-center w-20">
              <div
                onMouseEnter={() =>
                  document
                    .querySelector('#tooltip-restore-contact-' + person.id)
                    .classList.remove('invisible', 'opacity-0')
                }
                onMouseLeave={() =>
                  document
                    .querySelector('#tooltip-restore-contact-' + person.id)
                    .classList.add('invisible', 'opacity-0')
                }
                className={
                  'h-7 w-7 cursor-pointer relative rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center'
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardEdit(person);
                }}
              >
                <RedoIcon className={'text-gray-500 h-4 w-4 ml-0'} />
                <div
                  style={{ width: '126px' }}
                  id={'tooltip-restore-contact-' + person.id}
                  className="inline-block -right-4 top-[35px] z-50 absolute invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm dark:bg-gray-700"
                >
                  Restore Contact
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <div
      style={{ height: 'calc(100vh - 162px)' }}
      className={' flex flex-col text-center gap-2 items-center justify-center border-t border-t-gray-200'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
        <path
          d="M76.9349 12.7222C76.0856 11.1962 75.5652 10.3607 75.5652 10.3607C74.6657 8.78933 73.4658 9.09225 71.6108 9.25118L61.6499 10.4703C60.3996 10.5733 60.3996 10.5733 59.6653 9.65635C57.1841 6.49246 56.17 4.54392 54.443 4.97994L35.718 9.70739C33.9909 10.1434 34.0415 12.3352 33.3641 16.3159C33.1484 17.4533 33.1484 17.4533 32.0036 17.9744L22.6396 21.6341C20.9496 22.3702 19.7184 22.8551 19.6726 24.6652C19.6726 24.6652 19.6426 25.4656 19.5966 27.1983C19.561 29.5086 19.265 29.3319 21.2648 28.827L76.2398 14.9476C78.2441 14.4609 78.0811 14.7341 76.9349 12.7222Z"
          fill="#D1D5DB"
        />
        <path
          d="M71.1378 33H24.8629C21.7504 33 21.6004 33.4125 21.7879 35.7562L25.2941 81.2437C25.5941 83.55 25.8191 84.0188 28.5754 84.0188H67.4254C70.1816 84.0188 70.4066 83.55 70.7066 81.2437L74.2128 35.7562C74.4003 33.3937 74.2504 33 71.1378 33Z"
          fill="#D1D5DB"
        />
      </svg>
      <h5 className={'text-sm leading-5 font-medium text-gray-900'}>
        {searchTerm.length <= 0 ? 'Trash is Empty' : 'No Contacts found'}
      </h5>
      <p className={'text-xs leading-4 font-normal text-gray-500'}>
        Contacts that you moved to trash will be listed here
      </p>
    </div>
  );
};

export default TrashTable;
