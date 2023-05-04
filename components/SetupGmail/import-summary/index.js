import SimpleBar from 'simplebar-react';
import GlobalAlert from 'components/shared/alert/global-alert';
import Search from 'components/shared/input/search';
import Table from 'components/shared/table';
import Text from 'components/shared/text';
import { searchContacts } from 'global/functions';
import { useState } from 'react';


const GoogleContactsImportSummary = ({data}) => {
    const [searchTermImported, setSearchTermImported] = useState('');
    const [searchTermNotImported, setSearchTermNotImported] = useState('');
    const [importedContacts, setImportedContacts] = useState(data?.importable_new_contacts);
    const [notImportedContacts, setNotImportedContacts] = useState(data?.invalid_contacts);

    const handleSearch1 = (term) => {
        setSearchTermImported(term);
        let filteredArray = searchContacts(data?.importable_new_contacts, term);
        setImportedContacts(filteredArray?.data);
    }

    const handleSearch2 = (term) => {
        setSearchTermNotImported(term);
        let filteredArray = searchContacts(data?.invalid_contacts, term);
        setNotImportedContacts(filteredArray?.data);
    }

    return (
        <>

            <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center justify-between w-full">
                        <Text h3 className="text-gray7 text-xl">Imported Google Contacts Summary</Text>
                    </div>
                </div>

                {/* <div className="flex w-full border-y border-gray2" style={{ height: 'calc(100vh - 146px)' }}> */}
                <div className="flex w-full border-y border-gray2">
                    <div className={`p-6 border-r border-gray2 ${ data?.invalid_contacts &&  data?.invalid_contacts_count > 1 ? 'w-1/2': 'w-full'}`}>
                        <GlobalAlert
                            title={`${data?.importable_new_contacts_count} Contact${data?.importable_new_contacts_count > 1 ? 's' : ''} imported successfully`}
                            message="These contacts were able to be imported succesfully in the CRM."
                            type="success"
                            rounded
                        />
                        <Search
                            placeholder="Search Contact"
                            className="max-w-[300px] py-6"
                            onInput={(event) => handleSearch1(event.target.value)}
                            value={searchTermImported}
                        />
                        <div className="border border-gray2 rounded h-full">
                            <SimpleBar autoHide={true} style={{ maxHeight: '100%' }}>
                                <Table
                                tableFor="import-google-contacts-successful"
                                data={importedContacts}
                                ></Table>
                            </SimpleBar>
                        </div>
                    </div>
                    {
                    data?.invalid_contacts &&  data?.invalid_contacts_count > 1 &&
                        <div className="p-6 w-1/2">
                            <GlobalAlert
                                title={`${data?.invalid_contacts_count} Contact${data?.invalid_contacts_count > 1 ? 's were' : ' was'} unable to be imported`}
                                message={`${data?.invalid_contacts_count > 1 ? 'These contacts were' : 'This contact was'} not able to be imported due to the reason written in ${data?.invalid_contacts_count > 1 ? 'each of them.' : 'it.'}`}
                                type="error"
                                rounded
                            />
                            <Search
                                placeholder="Search Contact"
                                className="max-w-[300px] py-6"
                                onInput={(event) => handleSearch2(event.target.value)}
                                value={searchTermNotImported}
                            />
                            <div className="border border-gray2 rounded " >
                                <SimpleBar autoHide={true} style={{ maxHeight: '100%' }} >
                                    <Table
                                    tableFor="import-google-contacts-failed"
                                    data={notImportedContacts}
                                    ></Table>
                                </SimpleBar>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default GoogleContactsImportSummary;