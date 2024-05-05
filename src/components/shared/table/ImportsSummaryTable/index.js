import Table from '..';
import Input from '@components/shared/input';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';

const ImportsSummaryTable = ({ data, handleClickRow }) => {
  return (
    <Table>
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center">
            <Input type="checkbox" onChange={(event) => console.log(event)}></Input>
            File Name
          </th>
          <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            <div className="flex items-center justify-center">
              NEW RECORDS
              <InfoSharpIcon height={15} className="ml-3" />
            </div>
          </th>
          <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            <div className="flex items-center justify-center">
              UPDATED RECORDS
              <InfoSharpIcon height={15} className="ml-3" />
            </div>
          </th>
          <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            <div className="flex items-center justify-center">
              ERROR RECORDS
              <InfoSharpIcon height={15} className="ml-3" />
            </div>
          </th>
          <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            UPLOADED DATE
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {data.map((data) => (
          <tr
            key={data.id}
            className="hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200"
            onClick={(event) => handleClickRow(data, event)}>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 pl-6">
              <div className="flex items-center">
                <Input
                  type="checkbox"
                  onChange={(event) => handleSelectContact(event, contact)}
                  className="mr-1"></Input>
                <div className="text-gray7 font-medium">{data.fileName}</div>
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
              <div className="text-gray7 font-medium">{data.newRecords}</div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
              <div className="text-gray7 font-medium">{data.updatedRecords}</div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
              <div className="text-gray7 font-medium">{data.errorCount}</div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
              <div className="text-gray7 font-medium">{data.uploadedDate}</div>
              <div className="text-gray4">{data.uploadedTime}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ImportsSummaryTable;
