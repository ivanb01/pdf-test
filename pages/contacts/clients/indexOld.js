import { useState } from 'react';
import Accordion from 'components/shared/accordion';
import TabsSlider from 'components/shared/button/buttonsSlider';
import { tabs, sliderTabs, clientTypeCards } from './list';
import { PlusIcon } from '@heroicons/react/outline';
import {
  ViewBoardsIcon,
  MenuIcon,
  IdentificationIcon,
} from '@heroicons/react/solid';
import Button from 'components/shared/button';
import Search from 'components/shared/input/search';
import Chip from 'components/shared/chip';
import Checkbox from 'components/shared/checkbox';
import Column from 'components/column';
import Text from 'components/shared/text';
import AddClientManuallyOverlay from 'components/overlays/add-client/add-client-manually';
import AddContactManuallyOverlay from 'components/overlays/add-contact/add-contact-manually';
import AddContactOverlay from 'components/overlays/add-contact';
import ImportFromCsv from 'components/overlays/add-contact/import-from-csv';
import ImportingFromCsv from 'components/overlays/add-contact/import-from-csv/importing-csv';

const Clients = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [filter, setFilter] = useState(filter);
  const [hideFilter, setHideFilter] = useState(false);
  const localClientTypeCards = clientTypeCards.filter(
    ({ tabId }) => tabId === currentTab
  );

  const [selectedContactType, setSelectedContactType] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [selectedCard, setSelectedCard] = useState(0);

  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState(0);

  const [showAddContactManuallyOverlay, setShowAddContactManuallyOverlay] =
    useState(false);
  const [showAddContactOverlay, setShowAddContactOverlay] = useState(false);
  const [showImportFromCsvOverlay, setShowImportFromCsvOverlay] =
    useState(false);

  const [showImportingFromCsvOverlay, setShowImportingFromCsvOverlay] =
    useState(false);

  const handleAddClientChange = (state) => () =>
    setShowAddClientManuallyOverlay(state);

  const handleFilterClick = (filter) => () => {
    setFilter(filter);
  };
  return (
    <div className="pl-[24px]">
      <div className="flex items-center justify-between  pb-4 pr-[24px]">
        <TabsSlider
          tabs={sliderTabs}
          currentTab={currentTab}
          onClick={setCurrentTab}
        />
        <div className="flex items-center">
          <Checkbox
            state={hideFilter}
            setState={setHideFilter}
            label="Hide Filter Pannel"
          />
          <Chip label="Requires Follow Up" className="ml-4" />
        </div>
        <div className="flex items-center justify-self-end">
          <Search expandable placeholder="Search" className="mr-2" />
          <Button
            className="mx-2"
            secondary
            centerIcon={<MenuIcon height={20} />}
          />
          <Button
            className="mx-2"
            secondary
            centerIcon={<ViewBoardsIcon height={20} />}
          />
          <Button
            primary
            leftIcon={<PlusIcon className="w-4" />}
            label="Add Contacts"
            onClick={() => setShowAddContactOverlay(true)}
          />
        </div>
      </div>
      <div className="flex flex-row">
        {!hideFilter && (
          <div className="w-[22%] overflow-y-scroll h-[calc(100vh-288px)]">
            <Text
              h2
              className="text-gray7 border-b border-gray2 pt-2 pl-4 pb-3"
            >
              Filters
            </Text>
            <Accordion
              tabs={tabs}
              handleClick={handleFilterClick}
              activeFilter={filter}
            />
          </div>
        )}
        <div className="flex flex-row w-[100%] bg-gray10 overflow-x-scroll">
          {localClientTypeCards.map((clientTypeCard, index) => (
            <Column
              clientTypeCard={clientTypeCard}
              filter={filter}
              key={index}
            />
          ))}
        </div>
      </div>
      {showAddContactOverlay && (
        <AddContactOverlay
          title="Add Contact"
          addManually={() => setShowAddContactManuallyOverlay(true)}
          importCsv={() => setShowImportFromCsvOverlay(true)}
          handleClose={() => setShowAddContactOverlay(false)}
        />
      )}
      {showAddContactManuallyOverlay && (
        <AddContactManuallyOverlay
          selectedContactType={selectedContactType}
          setSelectedContactType={(arg) => setSelectedContactType(arg)}
          selectedStatus={selectedStatus}
          setSelectedStatus={(arg) => setSelectedStatus(arg)}
          selectedCard={selectedCard}
          setSelectedCard={(arg) => setSelectedCard(arg)}
          handleClose={() => setShowAddContactManuallyOverlay(false)}
          title="Add Contact"
        />
      )}
      {showImportFromCsvOverlay && (
        <ImportFromCsv
          title="Import CSV"
          setUploadingDocument={setUploadingDocument}
          onUploadDocument={setUploadedDocument}
          handleClose={() => setShowImportFromCsvOverlay(false)}
        />
      )}
      {showImportingFromCsvOverlay && (
        <ImportingFromCsv
          title="Uploading Document"
          handleClose={() => setShowImportingFromCsvOverlay(false)}
        />
      )}
      {/* {showAddClientManuallyOverlay && (
        <AddClientManuallyOverlay
          changeStep={changeStep}
          statuses={statuses}
          options={options}
          selectedClientType={selectedClientType}
          setSelectedClientType={setSelectedClientType}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          nextStep={nextStep}
          prevStep={prevStep}
          handleCloseOverlay={handleAddClientChange(false)}
        />
      )} */}
      {filter && (
        <div className="absolute bottom-0 left-[10%] h-16">
          <Button
            onClick={handleFilterClick('')}
            label="Clear Filter"
            secondaryDanger
          />
        </div>
      )}
    </div>
  );
};

export default Clients;
