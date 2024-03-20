import Overlay from '@components/shared/overlay';
import Button from '@components/shared/button';
import React, { useState } from 'react';
import RichtextEditor from '@components/Editor';
import { timeAgo } from '@global/functions';
import { getEmailsForSpecificContact, replyInThread, syncEmailOfContact } from '@api/email';

const EmailItem = ({ name, isLast, body, sentDate, threadId, contactEmail, setInboxData, fromEmail }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const _replyInThread = () => {
    setLoading(true);
    replyInThread(fromEmail, message.replace(/<\/?[^>]+(>|$)/g, ''), threadId).then((res) => {
      syncEmailOfContact(contactEmail).then(() => {
        getEmailsForSpecificContact(contactEmail).then((res) => {
          setInboxData(res.data);
          setLoading(false);
          setMessage('');
        });
      });
    });
  };
  return (
    <div className={'flex pr-6 pl-3 flex-col '}>
      <div className={'flex gap-3 items-start'}>
        <div
          className={
            'h-8 w-8 rounded-full shrink-0 bg-gray1 flex items-center justify-center text-base leading-6 font-semibold '
          }>
          {name[0]}
        </div>
        <div className={'flex flex-col'}>
          <div className={'flex gap-3 items-center'}>
            <h5 className={'font-semibold text-base text-[#344054]'}>{name}</h5>
            <div className="text-[#475467] font-medium text-sm">{sentDate}</div>
          </div>
          <div className={'text-sm font-normal text-[#475467]'} dangerouslySetInnerHTML={{ __html: body }}></div>
        </div>
      </div>
      {isLast && (
        <div className={'mx-[44px] flex flex-col gap-[18px] mt-[30px]'}>
          <RichtextEditor
            height={200}
            label="Message"
            value={message}
            placeholder="Write message here..."
            onContentChange={(value) => setMessage(value)}
          />
          <Button
            loading={loading}
            darkBlue
            disabled={message.length === 0}
            className={'bg-[#3B82F6] w-[64px] h-[34px]'}
            onClick={() => _replyInThread()}>
            Reply
          </Button>
        </div>
      )}
    </div>
  );
};

const EmailsPopup = ({ handleClose, threadData, setInboxData, contactEmail }) => {
  const [showAll, setShowAll] = useState(false);
  console.log(threadData, 'threadData');
  return (
    <Overlay
      className="xl:h-[780px] lg:h-[780px] w-[792px]"
      handleCloseOverlay={handleClose}
      includeTitleBorder
      title={threadData[0]?.subject}>
      {threadData?.length > 3 && !showAll ? (
        <div style={{ height: '80%', maxHeight: '80%', overflow: 'scroll' }}>
          <div className={'pt-[18px] pb-[36px] '}>
            <EmailItem
              fromEmail={threadData[0]?.from_email}
              contactEmail={contactEmail}
              setInboxData={setInboxData}
              threadId={threadData[0]?.thread_id}
              sentDate={timeAgo(threadData[0]?.sent_date)}
              name={`${threadData[0]?.from_first_name}  ${threadData[0]?.from_last_name}`}
              body={threadData[0]?.html_body.length > 0 ? threadData[0]?.html_body : threadData[0]?.body}
            />
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
            {threadData?.slice(-2).map((e, index) => (
              <React.Fragment key={index}>
                <EmailItem
                  fromEmail={threadData[0]?.from_email}
                  contactEmail={contactEmail}
                  setInboxData={setInboxData}
                  threadId={e?.thread_id}
                  sentDate={timeAgo(e?.sent_date)}
                  name={`${threadData[0]?.from_first_name} ${threadData[0]?.from_last_name}`}
                  isLast={index === threadData?.slice(-2).length - 1}
                  body={e?.html_body?.length > 0 ? e?.html_body : e?.body}
                />
                {!(index === threadData?.slice(-2).length - 1) && (
                  <div className={'h-[1px] bg-gray-100 my-[22px]'}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className={'pt-[18px] pb-[24px]'} style={{ height: '89%', overflow: 'scroll' }}>
            {threadData?.length < 3 || showAll ? (
              threadData?.map((e, index) => (
                <React.Fragment key={index}>
                  <EmailItem
                    fromEmail={threadData[0]?.from_email}
                    contactEmail={contactEmail}
                    setInboxData={setInboxData}
                    threadId={e?.thread_id}
                    sentDate={timeAgo(e?.sent_date)}
                    name={`${threadData[0]?.from_first_name}  ${threadData[0]?.from_last_name}`}
                    isLast={index === threadData?.length - 1}
                    body={e?.html_body?.length > 0 ? e?.html_body : e?.body}
                  />
                  {!(index === threadData?.length - 1) && <div className={'h-[1px] bg-gray-100 my-[22px]'}></div>}
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
