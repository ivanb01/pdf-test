import Input from '@components/shared/input';
import Text from '@components/shared/text';
import ContactInfo from '../contact-info';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TooltipComponent from '@components/shared/tooltip';
import Table from '..';
import { getSource } from '@global/functions';

const UncategorizedTable = ({ data, tableFor, handleSelectAll, handleClickRow }) => {
  return (
    <Table tableFor={tableFor}>
      {data?.length ? (
        <>
          <thead className="bg-gray-50 sticky z-10 top-0">
            <tr>
              <th
                scope="col"
                className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center">
                {tableFor == 'in-categorization' && (
                  <Input className="mr-1" id="select_all" type="checkbox" onChange={handleSelectAll} />
                )}
                Contact
              </th>
              {tableFor != 'in-categorization' && (
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Contact summary
                </th>
              )}
            </tr>
          </thead>
          <TransitionGroup component="tbody" className=" bg-white overflow-y-auto">
            {data.map((dataItem, index) => (
              <CSSTransition key={dataItem.id} timeout={500} classNames="item">
                <tr
                  key={dataItem.id}
                  id={'row_' + index}
                  className={`hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200`}
                  onClick={(event) => {
                    if (tableFor == 'in-categorization') {
                      if (event.target.id != 'input_' + index) {
                        document.querySelector('#input_' + index).click();
                      }
                    } else if (tableFor == 'uncategorized') {
                      handleClickRow(event.target);
                    }
                  }}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 flex items-center">
                    {tableFor == 'in-categorization' && (
                      <Input
                        className="mr-1"
                        type="checkbox"
                        id={'input_' + index}
                        onChange={(event) => handleClickRow(dataItem, event)}></Input>
                    )}
                    <ContactInfo
                      inCategorization={tableFor === 'in-categorization'}
                      emailsLength={15}
                      data={{
                        name: dataItem.first_name + ' ' + dataItem.last_name,
                        email: dataItem.email,
                        image: dataItem.profile_image_path,
                        import_source_text: dataItem.import_source_text,
                        summary: dataItem.summary,
                        approved_ai: !dataItem.approved_ai,
                      }}
                    />
                    {/* {(contact.type != null || contact.status != null) && (
                  <div className="flex items-center mt-3 type-and-status">
                    {contact.type != null && (
                      <div className="min-h-[28px] text-[10px] uppercase px-2 py-1 bg-gray1 rounded-[4px] font-medium mr-3 flex items-center border border-gray3">
                        {getContactTypeByTypeId(contact.type)}
                      </div>
                    )}
                    {contact.status != null && (
                      <div
                        className={` min-h-[28px] text-xs font-medium text-gray8 py-1 px-2 bg-purple1 rounded-xl mr-3 flex items-center border border-purple3`}
                      >
                        {getContactStatusByStatusId(contact.status)}
                      </div>
                    )}
                  </div>
                )} */}
                  </td>
                  {tableFor != 'in-categorization' && (
                    <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                      <div className={'flex gap-1.5 items-center justify-start'}>
                        {getSource(dataItem.import_source_text, dataItem.approved_ai).icon}
                        <p className={'text-xs leading-4 font-medium text-gray8'}>
                          {getSource(dataItem.import_source_text, dataItem.approved_ai).name}
                        </p>
                      </div>
                      {dataItem.summary !== null && (
                        <TooltipComponent
                          side={'bottom'}
                          align={'center'}
                          triggerElement={
                            <div
                              className={
                                'max-w-[239px] leading-5 text-left font-medium text-[11px] px-3 py-0.5 mt-1.5 text-ellipsis  overflow-hidden bg-lightBlue1 text-lightBlue3 '
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
                  )}
                </tr>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[490px] max-w-[390px] mx-auto my-0">
          <Text h3 className="text-gray7 mb-2 mt-4 text-center">
            No results have been found!
          </Text>
        </div>
      )}
    </Table>
  );
};

export default UncategorizedTable;
