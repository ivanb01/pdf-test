import SlideOver from '@components/shared/slideOver';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Button from '@components/shared/button';
import { AtSymbolIcon, MailIcon } from '@heroicons/react/outline';
import SendIcon from '@mui/icons-material/Send';
import sent from '../../../public/images/sent.svg';
import saved from '../../../public/images/saved.svg';
import Close from '@mui/icons-material/Close';
import { MultiSelect } from 'react-multi-select-component';
import SimpleBar from 'simplebar-react';
import { generateSMSFooter, getCompanyFromEmail, getInitials } from '@global/functions';
import chevronDown from '../../../public/images/ch-down.svg';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import React, { useState, useEffect, useRef } from 'react';
import placeholder from '../../../public/images/img-placeholder.png';
import { useSelector } from 'react-redux';

import AddClientManuallyOverlay from '@components/overlays/add-client/add-client-manually';
import { clientOptions, clientStatuses } from '@global/variables';
import { useRouter } from 'next/router';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
const SelectedProperty = ({ property, setSelected, selected }) => {
  const ref = useRef();
  return (
    <div className="bg-gray10 border border-gray1 flex items-center justify-between p-[10px] rounded-lg mb-2">
      <div className="flex items-center">
        <img
          className="h-[50px] w-[85px] object-cover rounded-lg mr-3"
          src={property?.PHOTOS?.length ? property.PHOTOS[0].PHOTO_URL : placeholder.src}
        />
        <div className="font-semibold text-gray7 mr-3 text-[14px]">
          {property.PROPERTY_TYPE} in {property.ADDRESS}
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          id={`checkbox-${property.ID}`}
          className="hidden"
          ref={ref}
          checked={selected}
          onChange={(event) => {
            setSelected((prevSelected) => prevSelected.filter((item) => item.ID !== property.ID));
          }}
        />
        <label
          htmlFor={`checkbox-${property.ID}`}
          className="flex items-center cursor-pointer"
          onClick={() => ref?.current?.click()}>
          <div className={` relative rounded-full w-6 h-6 flex flex-shrink-0 justify-center items-center text-gray4`}>
            {selected && (
              <RemoveCircleOutlineSharpIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

const PropertiesSlideOver = ({
  sendMethod,
  setSelectedProperties,
  open,
  setOpen,
  propertiesSent,
  previewMode,
  setPreviewMode,
  loadingEmails,
  _sendEmail,
  onPropertiesSave,
  selectedContacts,
  selectedProperties,
  setPropertiesSent,
  setSelectedContacts,
  filteredContacts,
  sortedOptions,
  showProperties,
  setShowProperties,
}) => {
  const [showAddContactOverlay, setShowAddContactOverlay] = useState(false);

  const allContacts = useSelector((state) => state.contacts.allContacts.data);
  const [email, setEmail] = useState();
  useEffect(() => {
    if (email) {
      handleAfterClientAdd(email);
    }
  }, [allContacts, email, sendMethod]);
  const handleAfterClientAdd = (email) => {
    const contact = allContacts?.find((contact) => contact.email == email);
    if (contact && email) {
      if (contact.phone_number === null && sendMethod === 2) {
        return;
      } else {
        setSelectedContacts([
          ...selectedContacts,
          {
            label: `${contact.first_name} ${contact.last_name} - ${contact.email}`,
            value: contact.id,
            email: contact.email,
            first_name: contact.first_name,
            last_name: contact.last_name,
            phone_number: contact.phone_number,
            profile_image_path: contact?.profile_image_path,
          },
        ]);
      }
      setEmail(undefined);
    }
  };
  const router = useRouter();
  const userInfo = useSelector((state) => state.global.userInfo);

  useEffect(() => {
    if (document.querySelector('.side-overlay-wrapper')) {
      if (propertiesSent) {
        document.querySelector('.side-overlay-wrapper').classList.add('justify-center');
      } else {
        document.querySelector('.side-overlay-wrapper').classList.remove('justify-center');
      }
    }
  }, [propertiesSent]);

  return (
    <>
      <SlideOver
        open={open}
        setOpen={setOpen}
        withBackdrop
        noHeader={!propertiesSent}
        buttons={
          propertiesSent ? null : (
            <div
              className={`flex items-center ${
                previewMode || sendMethod === 4 ? 'justify-end' : 'justify-between'
              }  w-[100%]`}>
              {!previewMode && sendMethod !== 4 && (
                <div
                  className={'flex gap-[6px] items-center justify-center text-gray8 cursor-pointer'}
                  role={'button'}
                  onClick={() => setPreviewMode(true)}>
                  <RemoveRedEyeOutlinedIcon className={'h-[18px] w-[18px]'} />
                  <p className={'text-sm leading-5 font-semibold'}>Preview</p>
                </div>
              )}
              {sendMethod == 1 ? (
                <Button
                  primary
                  leftIcon={<MailIcon />}
                  loading={loadingEmails}
                  label="Send via Email"
                  onClick={() => _sendEmail()}
                  disabled={!selectedContacts.length || !selectedProperties.length}
                />
              ) : sendMethod == 2 ? (
                <Button
                  primary
                  loading={loadingEmails}
                  leftIcon={<AtSymbolIcon />}
                  label="Send via SMS"
                  onClick={() => _sendEmail()}
                  disabled={!selectedContacts.length || !selectedProperties.length}
                />
              ) : sendMethod == 3 ? (
                <Button
                  primary
                  leftIcon={<SendIcon className={'h-3 w-3'} />}
                  loading={loadingEmails}
                  label="Send by Email & SMS"
                  onClick={() => _sendEmail()}
                  disabled={!selectedContacts.length || !selectedProperties.length}
                />
              ) : (
                <Button
                  primary
                  leftIcon={<SaveAltIcon className={'h-4 w-4'} />}
                  label="Save to portfolio"
                  loading={loadingEmails}
                  className="mr-3"
                  disabled={!selectedContacts.length || !selectedProperties.length}
                  onClick={() => {
                    onPropertiesSave();
                  }}
                />
              )}
            </div>
          )
        }>
        {propertiesSent ? (
          <div className="text-center">
            <lottie-player
              src="/animations/aisummary1.json"
              background="transparent"
              speed="1"
              style={{ height: '200px' }}
              autoplay></lottie-player>
            <div className="text-gray7 font-semibold text-[18px] -mt-7">
              {sendMethod !== 4
                ? 'Properties have been successfully sent to your clients!'
                : "Properties have been successfully saved to the client's portfolio!"}
            </div>
            {sendMethod !== 4 && (
              <div className=" mt-2">All properties that are sent are saved to your client's portfolio.</div>
            )}
            <Button
              primary
              label="Back to Properties"
              onClick={() => {
                setTimeout(() => {
                  setPropertiesSent(false);
                  setSelectedContacts([]);
                }, 500);
                setOpen(false);
              }}
              className="mt-6"
            />
          </div>
        ) : !previewMode ? (
          <div className="">
            <div className="flex items-center justify-between  mb-2">
              <div className="font-semibold text-gray7 text-[20px]">Select clients</div>
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => setOpen(false)}>
                <span className="sr-only">Close panel</span>
                <Close className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {filteredContacts && filteredContacts.length && (
              <MultiSelect
                options={sortedOptions}
                value={selectedContacts}
                onChange={(contacts) => {
                  setSelectedContacts(contacts);
                }}
                labelledBy="Search for clients"
                overrideStrings={{
                  selectSomeItems: 'Selected clients will appear here',
                  noOptions: router.pathname.includes('properties') && (
                    <div>
                      <p>
                        No client found,{' '}
                        <span
                          style={{ textDecoration: 'underline', opacity: 1, cursor: 'pointer', color: 'black' }}
                          onClick={() => {
                            setOpen(false);
                            setShowAddContactOverlay(true);
                          }}>
                          Add Client
                        </span>
                      </p>
                    </div>
                  ),
                }}
              />
            )}
            <div className="my-4">
              <span className="font-semibold text-gray7 text-[18px]">{selectedContacts.length}</span>
              <span className="text-gray8 text-[14px] font-medium">
                {' '}
                {selectedContacts.length == 1 ? 'Client' : 'Clients'} selected
              </span>
            </div>
            <SimpleBar autoHide={false} className="-mr-4" style={{ maxHeight: '300px ' }}>
              {selectedContacts &&
                selectedContacts.map((contact, index) => (
                  <div key={index} className={'flex justify-between items-center mb-5 mr-4'}>
                    <div className="flex gap-4">
                      <div>
                        {contact.profile_image_path ? (
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src={contact.profile_image_path}
                            alt={contact.first_name}
                          />
                        ) : (
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
                            <span className="text-sm font-medium leading-none text-white">
                              {getInitials(contact.first_name + ' ' + contact.last_name).toUpperCase()}
                            </span>
                          </span>
                        )}
                      </div>
                      <div>
                        <h6 className={'text-sm leading-5 text-gray7 font-semibold '}>
                          {contact.first_name} {contact.last_name}
                        </h6>
                        <h6
                          className={
                            ' text-sm leading-5 font-medium text-gray5 ellipsis-email xl:min-w-[230px] lg:w-[130px]'
                          }
                          title={contact.email}>
                          {contact.email}
                        </h6>
                      </div>
                    </div>
                    <div>
                      <button
                        className="text-sm font-semibold px-3 py-[6px] text-[#B91C1C]"
                        onClick={() =>
                          setSelectedContacts((prevSelected) =>
                            prevSelected.filter((prevContact) => prevContact.value !== contact.value),
                          )
                        }>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
            </SimpleBar>
            <hr className="my-3" />
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray7 text-[20px]">Properties</div>
              <a
                className={`cursor-pointer transition-all ${showProperties ? '' : 'rotate-180'}`}
                onClick={() => setShowProperties(!showProperties)}>
                <img src={chevronDown.src} />
              </a>
            </div>
            <div className="my-4">
              <span className="font-semibold text-gray7 text-[18px]">{selectedProperties.length}</span>
              <span className="text-gray8 font-medium text-[14px]">
                {' '}
                {selectedProperties.length == 1 ? 'Property' : 'Properties'} selected
              </span>
            </div>
            {showProperties && (
              <>
                {selectedProperties.map((property) => (
                  <SelectedProperty property={property} setSelected={setSelectedProperties} selected={true} />
                ))}
              </>
            )}
          </div>
        ) : (
          <div>
            <div className={'flex items-center justify-between mb-[20px]'}>
              <div className={'flex items-center justify-between text-[#111827] gap-[14px]'}>
                <ArrowBackOutlinedIcon
                  className={'h-[22px] w-[22px] cursor-pointer'}
                  onClick={() => setPreviewMode(false)}
                />
                <p className={'text-xl leading-8 font-semibold'}>Preview</p>
              </div>
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => setOpen(false)}>
                <span className="sr-only">Close panel</span>
                <Close className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className={'text-sm leading-5 font-semibold text-gray7'}>Message for our Valued Clients</p>
            <div className={'bg-[#F9FAFB] p-3 border border-gray2 rounded-[8px] mt-[14px] text-gray7'}>
              {sendMethod !== 2 ? (
                <div>
                  <p style={{ color: '#344054', marginBottom: '32px' }}>
                    Hey [client name],
                    <br />
                    <br /> I've compiled a portfolio for you to take a look at. Feel free to browse through and let me
                    know if anything catches your eye. You can indicate if there are any properties you particularly
                    like or dislike to help keep your search organized.{' '}
                  </p>
                  <p style={{ color: '#344054' }}>Looking forward to hearing your thoughts!</p>
                  <p style={{ color: '#344054', marginBottom: '15px' }}>
                    <br />
                    {userInfo && userInfo?.first_name?.length > 0 && userInfo?.last_name?.length > 0
                      ? `${userInfo?.first_name}`
                      : userInfo?.email}
                  </p>
                  <Button darkBlue label={'View Properties in Your Portfolio'} />
                </div>
              ) : (
                <p className="text-sm">
                  Hey [client name], new properties have been added in your portfolio. View here: [portfolio link].{' '}
                  {generateSMSFooter(userInfo)}
                </p>
              )}
            </div>
            <div className={'h-[1px] border border-gray1 my-[26px]'}></div>
            <p className={'text-sm leading-5 font-bold text-gray7 mb-[14px]'}>Client & Property Selection Update</p>
            <div className={'flex gap-[20px] items-center justify-center pb-[70px]'}>
              <div
                className={
                  'p-4 flex items-start gap-[44px] shadow-lg flex-col border border-gray1 bg-white flex-1 rounded-[8px] '
                }>
                <div className={'h-[58px] w-[58px] rounded-full bg-gray1 flex items-center justify-center'}>
                  <PersonOutlineOutlinedIcon className={'h-6 w-6 text-[#0D9488]'} />
                </div>
                <div>
                  <p className={'text-3xl leading-9 font-bold text-black mb-[6px]'}>{selectedContacts.length ?? 0}</p>
                  <p className={'text-lg leading-8 font-medium text-gray5 '}>
                    {selectedContacts.length === 1 ? 'Client' : 'Clients'}
                  </p>
                </div>
              </div>
              <div
                className={
                  'p-4 flex items-start gap-[44px] shadow-lg flex-col flex-1  border border-gray1 bg-white rounded-[8px]'
                }>
                <div className={'h-[58px] w-[58px] rounded-full bg-gray1 flex items-center justify-center'}>
                  <CorporateFareOutlinedIcon className={'h-6 w-6 text-[#2563EB]'} />
                </div>
                <div>
                  <p className={'text-3xl leading-9 font-bold text-black mb-[6px]'}>{selectedProperties.length ?? 0}</p>
                  <p className={'text-lg leading-8 font-medium text-gray5 '}>
                    {selectedProperties.length === 1 ? 'Property' : 'Properties'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </SlideOver>
      {showAddContactOverlay && (
        <AddClientManuallyOverlay
          onClientAdded={(email) => {
            setOpen(true);
            setEmail(email);
            setShowAddContactOverlay(false);
          }}
          handleClose={() => setShowAddContactOverlay(false)}
          title="Add Client"
          options={clientOptions}
          statuses={clientStatuses}
        />
      )}
    </>
  );
};
export default PropertiesSlideOver;
