import Table from '..';
import { getContactStatusByStatusId, getContactTypeByTypeId, getContactStatusColorByStatusId } from 'global/functions';
import Chip from '@components/shared/chip';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TooltipComponent from '@components/shared/tooltip';
import ContactInfo from '../contact-info';
import { useSelector } from 'react-redux';

const CategorizedTable = ({ data, undoAllCategorizations, undoCategorization }) => {
  const vendorSubtypes = useSelector((state) => state.global.vendorSubtypes);
  const showStatus = (dataItem) => {
    return dataItem.status_id != null && dataItem.status_id !== 1;
  };
  return (
    <Table>
      <thead className="bg-gray-50 sticky top-0 z-10">
        <tr>
          <th
            scope="col"
            className="py-3 pl-4 pr-6 text-center text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
            <TooltipComponent
              side={'bottom'}
              align={'center'}
              triggerElement={
                <svg
                  className={'cursor-pointer'}
                  version="1.1"
                  viewBox="0 0 16 20"
                  width="15px"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => undoAllCategorizations()}>
                  <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
                    <g fill="#6B7280" id="Core" transform="translate(-424.000000, -463.000000)">
                      <g id="undo" transform="translate(424.000000, 464.000000)">
                        <path
                          d="M8,3 L8,-0.5 L3,4.5 L8,9.5 L8,5 C11.3,5 14,7.7 14,11 C14,14.3 11.3,17 8,17 C4.7,17 2,14.3 2,11 L0,11 C0,15.4 3.6,19 8,19 C12.4,19 16,15.4 16,11 C16,6.6 12.4,3 8,3 L8,3 Z"
                          id="Shape"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              }>
              <p className="text-xs leading-4 font-normal"> Undo All</p>
            </TooltipComponent>
          </th>
          <th scope="col" className="py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            {data.length} Categorized Contacts
          </th>
        </tr>
      </thead>
      <TransitionGroup component="tbody" className=" bg-white overflow-y-auto">
        {data.map((dataItem, index) => (
          <CSSTransition key={dataItem.id} timeout={500} classNames="item-reverse">
            <tr key={dataItem.email} id={'row_' + index} className={`contact-row border-b border-gray-200`}>
              <td className="relative whitespace-nowrap h-[72.5px] py-4 px-6 flex ">
                <TooltipComponent
                  side={'bottom'}
                  align={'center'}
                  triggerElement={
                    <svg
                      version="1.1"
                      viewBox="0 0 16 20"
                      width="15px"
                      xmlns="http://www.w3.org/2000/svg"
                      className={'cursor-pointer'}
                      onClick={() => undoCategorization(dataItem.id)}>
                      <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
                        <g fill="#6B7280" id="Core" transform="translate(-424.000000, -463.000000)">
                          <g id="undo" transform="translate(424.000000, 464.000000)">
                            <path
                              d="M8,3 L8,-0.5 L3,4.5 L8,9.5 L8,5 C11.3,5 14,7.7 14,11 C14,14.3 11.3,17 8,17 C4.7,17 2,14.3 2,11 L0,11 C0,15.4 3.6,19 8,19 C12.4,19 16,15.4 16,11 C16,6.6 12.4,3 8,3 L8,3 Z"
                              id="Shape"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  }>
                  <p className="text-xs leading-4 font-normal"> Undo Categorization</p>
                </TooltipComponent>
              </td>
              <td className="whitespace-nowrap py-4  text-sm">
                <ContactInfo
                  data={{
                    name: dataItem.first_name + ' ' + dataItem.last_name,
                    email: dataItem.email,
                    image: dataItem.profile_image_path,
                  }}
                  emailsLength={15}
                  maxWidth={'50px'}
                  emailHover
                />
                {(dataItem.category_id != null || dataItem.status_id != null) && (
                  <div className="flex items-center mt-3 type-and-status">
                    {dataItem.category_id != null && (
                      <Chip typeStyle>{getContactTypeByTypeId(vendorSubtypes, dataItem.category_id)}</Chip>
                    )}
                    {showStatus(dataItem) && (
                      <Chip
                        statusStyle
                        className={getContactStatusColorByStatusId(dataItem.category_id, dataItem.status_id)}>
                        {getContactStatusByStatusId(dataItem.category_id, dataItem.status_id)}
                      </Chip>
                    )}
                  </div>
                )}
              </td>
            </tr>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Table>
  );
};

export default CategorizedTable;
