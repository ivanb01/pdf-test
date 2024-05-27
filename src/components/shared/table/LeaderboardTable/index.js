import ContactInfo from '../contact-info';
import { useSelector } from 'react-redux';
import { formatDateLThour, formatDateLL } from 'global/functions';
import ClientHealth from 'components/clientHealth';
import React from 'react';
import CheckCircleIcon from '@heroicons/react/solid/CheckCircleIcon';
import { getEmailParts } from 'global/functions';
import Table from '..';

const LeaderboardTable = ({ data, tableFor }) => {
  function calculateClosedClients(closedClients, totalClients) {
    if (totalClients === 0) {
      return (0).toFixed(2);
    }

    let percentage = (closedClients / totalClients) * 100;
    return percentage.toFixed(2);
  }

  const userInfo = useSelector((state) => state.global.userInfo);
  const userEmail = localStorage.getItem('user');

  return (
    <Table tableFor={tableFor}>
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="h-[56px] py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center "
          >
            Agent
          </th>
          <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            # of clients
          </th>
          <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            In the funnel
          </th>
          <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            Client health
          </th>
          <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            closed clients
          </th>
          <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            conversion
          </th>
          {/* <th
            scope="col"
            className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
          >
            Time spent in the crm
          </th> */}
          <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            last communication
          </th>
        </tr>
      </thead>
      <tbody className=" bg-white">
        {data.map((dataItem, index) => (
          <tr
            key={index}
            className={`${userEmail.includes(dataItem.agent_id) && 'bg-lightBlue1'} contact-row group border-b border-gray-200`}
            // onClick={(event) => handleClickRow(contact, event)}
          >
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 w-96">
              <ContactInfo
                data={{
                  // name: `${dataItem.first_name + ' ' + dataItem.last_name}`,
                  name: `${getEmailParts(dataItem.agent_id).firstName} ${getEmailParts(dataItem.agent_id).lastName}`,
                  id: dataItem.id,
                  email: dataItem.agent_id,
                  // image: dataItem.profile_image_path,
                }}

                // handleSelect={(e, dataItem) =>
                //   handleSelectContact(e, dataItem)
                // }
                // handleAction={(id, action) => handleAction(id, action)}
              />
            </td>
            <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
              <div className="text-gray7 font-medium">{dataItem.total_clients}</div>
              <div className="text-gray4 italic">{dataItem.clients_in_funnel} in the funnel</div>
            </td>
            <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
              <div className="text-gray7 font-medium">{dataItem.clients_in_funnel}</div>
              <div className="text-gray4 italic">{dataItem.clients_in_funnel_new_lead} new leads</div>
            </td>
            <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
              <ClientHealth
                healthyCount={dataItem.healthy_communication}
                unhealthyCount={dataItem.unhealthy_communication}
                percentage={dataItem.percentage_healthy_clients}
              />
            </td>
            <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
              <div className="text-gray7 flex items-center justify-center">
                {dataItem.clients_closed}{' '}
                <CheckCircleIcon
                  className={`h-4 ml-1 ${dataItem.clients_closed == 0 ? 'text-gray3' : 'text-green5'}`}
                />
              </div>
            </td>
            <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
              <div className="text-gray7 font-medium">
                {dataItem.conversion_percentage}%
              </div>
            </td>
            <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
              {dataItem.last_interaction ? (
                <>
                  <div className="text-gray7">{formatDateLL(dataItem.last_interaction)}</div>
                  <div className="text-gray4">{formatDateLThour(dataItem.last_interaction)}</div>
                </>
              ) : (
                <div className="text-red-500">No Communication</div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LeaderboardTable;
