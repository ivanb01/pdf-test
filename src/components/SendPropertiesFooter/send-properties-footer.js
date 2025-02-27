import Button from '@components/shared/button';
import SendIcon from '@mui/icons-material/Send';
import { AtSymbolIcon, MailIcon } from '@heroicons/react/outline';
import React, { useEffect } from 'react';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const SendPropertiesFooter = ({
  selectedProperties,
  onSendEmailClick,
  onSendEmailAndSmsClick,
  onSendSmsClick,
  setSelectedProperties,
  onSavePropertiesClick,
  contactId,
}) => {
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const router = useRouter();
  const clearSelectedProperties = () => {
    setSelectedProperties([]);
  };
  return (
    <div className="custom-box-shadow-2 px-6 py-[14px] fixed left-0 bottom-0 right-0 bg-white flex items-center justify-between z-50">
      <div className=" bg-gray1 px-[14px] py-[10px] w-fit">
        <span className="font-semibold text-gray7">{selectedProperties?.length}</span>
        <span className="text-gray8 font-medium">
          {' '}
          {selectedProperties?.length == 1 ? 'Property' : 'Properties'} selected
        </span>
      </div>
      <div className="flex">
        <Button white label={'Cancel'} className="mr-3" onClick={() => clearSelectedProperties()} />
        {!router.pathname.includes('details') && (
          <Button
            primary
            leftIcon={<SaveAltIcon className={'h-4 w-4'} />}
            label="Save to portfolio"
            className="mr-3"
            onClick={() => {
              onSavePropertiesClick();
            }}
          />
        )}
        <Button
          primary
          leftIcon={<SendIcon className={'h-4 w-4'} />}
          label="Send via Email & SMS"
          className="mr-3"
          onClick={() => {
            onSendEmailAndSmsClick();
            // setSendMethod(3);
            // setOpen(true);
          }}
        />
        {(router.pathname.includes('properties') || contacts.find((c) => c.id == contactId)?.phone_number) && (
          <Button
            primary
            leftIcon={<AtSymbolIcon />}
            label="Send via SMS"
            className="mr-3"
            onClick={() => {
              onSendSmsClick();
              // setSendMethod(2);
              // setOpen(true);
            }}
          />
        )}
        <Button
          primary
          leftIcon={<MailIcon />}
          label="Send via Email"
          onClick={() => {
            onSendEmailClick();
            // setSendMethod(1);
            // setOpen(true);
          }}
        />
      </div>
    </div>
  );
};

export default SendPropertiesFooter;
