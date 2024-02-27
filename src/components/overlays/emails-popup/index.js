import Overlay from '@components/shared/overlay';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import Editor from '@components/shared/editor';
import SimpleBar from 'simplebar-react';
import Button from '@components/shared/button';
import React, { useState } from 'react';
const emails = [
  {
    id: 1,
    name: 'Test1',
  },
  {
    id: 2,
    name: 'Test2',
  },
  {
    id: 3,
    name: 'Test4',
  },
  {
    id: 4,
    name: 'Test5',
  },
  {
    id: 5,
    name: 'Test6',
  },
];

const EmailItem = ({ name, isLast }) => {
  return (
    <div className={'flex pr-6 pl-3 flex-col '}>
      <div className={'flex gap-3 items-start'}>
        <div className={'h-8 w-8 rounded-xl'}>
          <img src={'https://i.imgur.com/veAGavU.png'} />
        </div>
        <div className={'flex flex-col gap-[10px]'}>
          <div className={'flex gap-3 items-center'}>
            <h5 className={'font-semibold text-base text-[#344054]'}>{name}</h5>
            <div className="text-[#475467] font-medium text-sm">2 days ago</div>
          </div>
          <div className={'text-sm font-normal text-[#475467]'}>
            Hi Joshua, how are you doing? I understand the situation of yours so please give us time to rethink...
          </div>
        </div>
      </div>
      {isLast && (
        <div className={'mx-[44px] flex flex-col gap-[18px] mt-[19px]'}>
          <Editor message={'test'} />
          <Button darkBlue className={'bg-[#3B82F6] w-[64px] h-[34px]'} onClick={() => {}}>
            Reply
          </Button>
        </div>
      )}
    </div>
  );
};

const EmailsPopup = ({ handleClose }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <Overlay
      className="xl:h-[780px] lg:h-[780px] w-[792px]"
      handleCloseOverlay={handleClose}
      includeTitleBorder
      title={'[Admin] Purchase Cema: How It Benefits Your Buyers and Sellers'}>
      {emails.length > 3 && !showAll ? (
        <div style={{ height: '80%', maxHeight: '80%', overflow: 'scroll' }}>
          <div className={'pt-[18px] pb-[36px] '}>
            <EmailItem name={emails[0].name} />
          </div>
          <div className={'h-[5px] border-y border-gray2 relative'}>
            <div className={'absolute ml-3 top-[-16px] cursor-pointer'} onClick={() => setShowAll(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15.5" fill="#F9FAFB" stroke="#D1D5DB" />
                <path
                  d="M16.1351 21.3298L19.8649 17.6001L21 18.7352L16.1351 23.6001L11.2703 18.7352L12.4054 17.6001L16.1351 21.3298Z"
                  fill="#4B5563"
                />
                <path
                  d="M15.8649 11.2703L12.1351 15L11 13.8649L15.8649 9L20.7297 13.8649L19.5946 15L15.8649 11.2703Z"
                  fill="#4B5563"
                />
              </svg>
            </div>
          </div>
          <div className={'mt-[32px]'}>
            {emails.slice(-2).map((e, index) => (
              <React.Fragment key={index}>
                <EmailItem name={e.name} isLast={index === emails.slice(-2).length - 1} />
                {!(index === emails.slice(-2).length - 1) && <div className={'h-[1px] bg-gray-100 my-[22px]'}></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className={'pt-[18px] pb-[24px]'} style={{ height: '89%', overflow: 'scroll' }}>
            {emails.length < 3 || showAll ? (
              emails.map((e, index) => (
                <React.Fragment key={index}>
                  <EmailItem name={e.name} isLast={index === emails.length - 1} />
                  {!(index === emails.length - 1) && <div className={'h-[1px] bg-gray-100 my-[22px]'}></div>}
                </React.Fragment>
              ))
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </Overlay>
  );
};

export default EmailsPopup;
