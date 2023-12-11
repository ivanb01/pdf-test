import SimpleBar from 'simplebar-react';
import GlobalAlert from 'components/shared/alert/global-alert';
import Search from 'components/shared/input/search';
import Table from 'components/shared/table';
import Text from 'components/shared/text';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/shared/button';
import { setRefetchData } from '@store/global/slice';
import { useDispatch } from 'react-redux';

const GoogleContactsImportSummary = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [allContacts, setAllContacts] = useState([]);
  const [searchTermImported, setSearchTermImported] = useState('');
  const [searchTermNotImported, setSearchTermNotImported] = useState('');
  const [importedContacts, setImportedContacts] = useState([]);
  const [notImportedContacts, setNotImportedContacts] = useState([]);

  const handleSearch1 = (term) => {
    setSearchTermImported(term);
    const trimmedSearchValue = term.replace(/\s+/g, '').toLowerCase();
    let filteredArray = allContacts?.importable_new_contacts.filter((item) => {
      const fullName = `${item.first_name}${item.last_name}`.toLowerCase();
      const fullEmail = `${item.email}`.toLowerCase();
      return fullName.includes(trimmedSearchValue) || fullEmail.includes(trimmedSearchValue);
    });
    setImportedContacts(filteredArray);
  };

  const handleSearch2 = (term) => {
    setSearchTermNotImported(term);
    const trimmedSearchValue = term.replace(/\s+/g, '').toLowerCase();
    let filteredArray = [...allContacts?.invalid_contacts, ...allContacts?.existing_contacts].filter((item) => {
      const invalidContactDetails = `${item.details}`.toLowerCase();
      const fullName = `${item.first_name}${item.last_name}`.toLowerCase();
      const fullEmail = `${item.email}`.toLowerCase();
      return (
        invalidContactDetails.includes(trimmedSearchValue) ||
        fullName.includes(trimmedSearchValue) ||
        fullEmail.includes(trimmedSearchValue)
      );
    });
    setNotImportedContacts(filteredArray);
  };

  useEffect(() => {
    dispatch(setRefetchData(true));
    setAllContacts(data);
    setImportedContacts(data?.importable_new_contacts);
    setNotImportedContacts([...data?.invalid_contacts]);
  }, [data]);

  return (
    <>
      <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <Text h3 className="text-gray7 text-xl">
              Imported Google Contacts Summary
            </Text>
          </div>
        </div>

        {/* <div className="flex w-full border-y border-gray2" style={{ height: 'calc(100vh - 146px)' }}> */}
        <div className="flex w-full border-y border-gray2 relative pb-[58px]">
          <div
            className={`p-6 border-r border-gray2 ${
              (allContacts?.invalid_contacts && allContacts?.invalid_contacts_count >= 1) ||
              (allContacts?.existing_contacts && allContacts?.existing_contacts.length >= 1)
                ? 'w-1/2'
                : 'w-full'
            }`}>
            <GlobalAlert
              title={
                allContacts?.importable_new_contacts_count === 0
                  ? '0 contacts to be imported'
                  : allContacts?.importable_new_contacts_count === 1
                  ? '1 contact imported successfully'
                  : allContacts?.importable_new_contacts_count > 1
                  ? `${allContacts?.importable_new_contacts_count} contacts imported successfully`
                  : ''
              }
              message={
                allContacts?.importable_new_contacts_count === 0
                  ? 'There are no contacts to be imported in the CRM.'
                  : allContacts?.importable_new_contacts_count === 1
                  ? 'This contact was successfully imported. Your next step is to sort it in the uncategorized contacts section.'
                  : allContacts?.importable_new_contacts_count > 1
                  ? 'These contacts were successfully imported. Your next step is to sort them in the uncategorized contacts section.'
                  : ''
              }
              type="success"
              rounded
            />

            <Search
              placeholder="Search Contact"
              className="max-w-[300px] py-6"
              onInput={(event) => handleSearch1(event.target.value)}
              value={searchTermImported}
            />
            <div className="border border-gray2 rounded overflow-hidden" style={{ height: 'calc(100vh - 438px)' }}>
              {/*<SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 438px)' }}>*/}
              <Table
                tableFor="import-google-contacts-successful"
                data={allContacts}
                // allContacts={imports1}
              ></Table>
              {/*</SimpleBar>*/}
            </div>
          </div>
          {allContacts?.invalid_contacts && (
            <div className="p-6 w-1/2">
              <GlobalAlert
                title={`
                                ${
                                  allContacts?.invalid_contacts_count === 1 ? '1 Contact was unable to be imported' : ''
                                } 
                                ${
                                  allContacts?.invalid_contacts_count >= 0
                                    ? `${allContacts?.invalid_contacts_count} Contacts were unable to be imported`
                                    : ''
                                } 
                            `}
                message={`
                                ${
                                  allContacts?.invalid_contacts_count === 1
                                    ? 'This contact was unable to be imported. See the error message below.'
                                    : ''
                                }
                                ${
                                  allContacts?.invalid_contacts_count > 0
                                    ? 'These contacts were unable to be imported. See the error message below.'
                                    : ''
                                }
                                 ${
                                   allContacts?.invalid_contacts_count === 0
                                     ? 'There are no contacts that were unable to be imported in the CRM.'
                                     : ''
                                 }
                            `}
                type="error"
                rounded
              />
              <Search
                placeholder="Search Contact"
                className="max-w-[300px] py-6"
                onInput={(event) => handleSearch2(event.target.value)}
                value={searchTermNotImported}
              />
              <div className="border border-gray2 rounded overflow-hidden" style={{ height: 'calc(100vh - 438px)' }}>
                {/*<SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 438px)' }}>*/}
                <Table tableFor="import-google-contacts-failed" data={notImportedContacts}></Table>
                {/*</SimpleBar>*/}
              </div>
            </div>
          )}
          <div className="bg-white absolute bottom-0 left-0 right-0 px-6 py-4 fixed-categorize-menu rounded-b-lg flex items-center justify-end">
            <Button
              label="Close"
              white
              className="mr-4"
              onClick={() =>
                router.push({
                  pathname: '/contacts/clients',
                })
              }
            />
            {importedContacts.length > 0 && (
              <Button
                label="Start categorization"
                className=""
                onClick={() =>
                  router.push({
                    pathname: '/contacts/uncategorized',
                    // query: { categorize: true },
                  })
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleContactsImportSummary;
