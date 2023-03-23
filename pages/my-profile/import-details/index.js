import MainMenu from 'components/shared/menu';
import Text from 'components/shared/text';
import Router from 'next/router';
import GlobalAlert from 'components/shared/alert/global-alert';
import Search from 'components/shared/input/search';
import Table from 'components/shared/table';
import { useState } from 'react';
const ImportDetails = () => {
  const [imports] = useState([
    {
      email: 'blendk@outlook.com',
      first_name: 'Blendar',
      last_name: 'Kabashi',
      import_error: '',
    },
    {
      email: 'gentk@outlook.com',
      first_name: 'Gent',
      last_name: 'Kabashi',
      import_error: '',
    },
    {
      email: 'testk@outlook.com',
      first_name: 'Test 1',
      last_name: 'Kabashi',
      import_error: '',
    },
    {
      email: 'test2k@outlook.com',
      first_name: 'Test 2',
      last_name: 'Kabashi',
      import_error: '',
    },
    {
      email: 'test3k@outlook.com',
      first_name: 'Test 3',
      last_name: 'Kabashi',
      import_error: 'Reason of not being imported in the system',
    },
    {
      email: 'test4k@outlook.com',
      first_name: 'Test 4',
      last_name: 'Kabashi',
      import_error: 'Reason of not being imported in the system',
    },
    {
      email: 'test5k@outlook.com',
      first_name: 'Test 5',
      last_name: 'Kabashi',
      import_error: 'Reason of not being imported in the system',
    },
    {
      email: 'test6k@outlook.com',
      first_name: 'Test 6',
      last_name: 'Kabashi',
      import_error: 'Reason of not being imported in the system',
    },
  ]);
  return (
    <>
      <MainMenu />
      <div className="p-6 flex items-center justify-between border-b border-gray2">
        <div className="flex items-center justify-between w-full">
          <Text
            h3
            className="text-gray7"
            onBackClick={() => Router.push('/my-profile')}
          >
            Import Details
          </Text>
          <div className="flex items-center justify-self-end">
            <Text p className="text-gray7 mr-2 font-semibold">
              04/28/2022
            </Text>
            <Text p className="text-gray4">
              10:00 AM
            </Text>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full">
        <div className="p-6 border-r border-gray2 w-1/2">
          <GlobalAlert
            title="12 Contacts imported successfully"
            message="These contacts were able to be imported succesfully in the CRM."
            type="success"
            rounded
          />
          <Search placeholder="Search Contact" className="max-w-[300px] my-6" />
          <div className="border border-gray2 rounded">
            <Table
              tableFor="import-successful"
              data={imports.filter(
                (importData) => importData.import_error == ''
              )}
            ></Table>
          </div>
        </div>
        <div className="p-6 w-1/2">
          <GlobalAlert
            title="5 Contacts were unable to be imported"
            message="These contacts were not able to be imported due to the reason written in each of them."
            type="error"
            rounded
          />
          <Search placeholder="Search Contact" className="max-w-[300px] my-6" />
          <div className="border border-gray2 rounded">
            <Table
              tableFor="import-failed"
              data={imports.filter(
                (importData) => importData.import_error != ''
              )}
            ></Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportDetails;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
