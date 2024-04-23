import Overlay from '@components/shared/overlay';
import Button from '@components/shared/button';
import React, { useEffect, useState } from 'react';
import RichtextEditor from '@components/Editor';
import { timeAgo } from '@global/functions';
import { getEmailsForSpecificContact, replyInThread, syncEmailOfContact } from '@api/email';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';

const EmailItem = ({
  name,
  isLast,
  body,
  message_header_id,
  sentDate,
  threadId,
  contactEmail,
  setInboxData,
  fromEmail,
  inboxData,
  subject,
  email,
  openedEditor,
  setOpenedEditor,
  setHideTopButton,
}) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const allContacts = useSelector((state) => state.contacts.allContacts);
  const userInfo = useSelector((state) => state.global.userInfo);
  const _replyInThread = () => {
    setLoading(true);
    setInboxData({
      ...inboxData,
      [threadId]: [
        {
          subject: subject,
          body: message,
          message_header_id: message_header_id,
          thread_id: threadId,
          sent_date: new Date(),
        },
        ...inboxData[threadId],
      ],
    });
    setLoading(false);
    setMessage('');
    replyInThread(contactEmail, message, message_header_id, threadId, subject)
      .then(() => {
        syncEmailOfContact(contactEmail).then(() => {
          getEmailsForSpecificContact(contactEmail).then((res) => {
            setInboxData(res.data);
          });
        });
      })
      .catch(() => {
        toast.error('Something went wrong');
      });
  };
  useEffect(() => {
    if (openedEditor) {
      setHideTopButton(true);
    }
  }, [openedEditor]);

  return (
    <div className={'flex px-6 flex-col '}>
      <div className={'flex gap-3 items-start'}>
        <img
          className={'h-8 w-8 rounded-full shrink-0 flex items-center justify-center text-base leading-6 font-semibold'}
          src={
            allContacts?.data?.find((c) => c.email === email)?.profile_image_path || 'https://i.imgur.com/UbQ7NC6.png'
          }
        />
        <div className={'flex flex-col'}>
          <div className={'flex gap-3 items-center'}>
            <h5 className={'font-semibold text-base text-[#344054]'}>
              {email === userInfo?.email
                ? userInfo?.first_name + ' ' + userInfo?.last_name
                : name.replace(/\bundefined\b/g, '')}
            </h5>
            <div className="text-[#475467] font-medium text-sm">{sentDate}</div>
          </div>
          <div className={'text-sm font-normal'} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}></div>
        </div>
      </div>
      {isLast && (
        <div className={' flex flex-col gap-[18px] mt-[30px]'}>
          {openedEditor ? (
            <>
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
                className={'bg-lightBlue3 w-[64px] h-[34px]'}
                onClick={() => _replyInThread()}>
                Reply
              </Button>
            </>
          ) : (
            <Button darkBlue className={'bg-lightBlue3 w-[64px] h-[34px]'} onClick={() => setOpenedEditor(true)}>
              Reply
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const EmailsPopup = ({ handleClose, threadData, setInboxData, contactEmail, inboxData }) => {
  const [showAll, setShowAll] = useState(false);
  const [openedEditor, setOpenedEditor] = useState(false);
  const [hideTopButton, setHideTopButton] = useState(false);

  return (
    <Overlay
      alignStart
      className=" w-[792px]"
      titleButton={
        !hideTopButton && (
          <Button
            primary
            className="ml-4 mr-2"
            label="Reply"
            size="small"
            onClick={() => {
              let element = document.querySelector('.email-area');
              setOpenedEditor(true);
              setTimeout(() => {
                element.scrollTop = element.scrollHeight;
              }, 200);
            }}
          />
        )
      }
      handleCloseOverlay={handleClose}
      includeTitleBorder
      title={threadData[0]?.subject?.length > 0 ? threadData[0]?.subject : '(no subject)'}>
      {threadData?.length > 3 && !showAll ? (
        <div
          className="email-area"
          style={{ height: 'calc(100% - 78px)', maxHeight: 'calc(100% - 78px) ', overflow: 'auto' }}>
          <div className={'pt-[18px] pb-[36px] '}>
            <EmailItem
              inboxData={inboxData}
              subject={threadData[threadData?.length - 1]?.subject}
              fromEmail={threadData[threadData?.length - 1]?.to_emails}
              contactEmail={contactEmail}
              setInboxData={setInboxData}
              threadId={threadData[0]?.thread_id}
              message_header_id={threadData[0]?.message_header_id}
              sentDate={timeAgo(threadData[0]?.sent_date)}
              name={`${threadData[threadData[threadData?.length - 1]]?.from_first_name}  ${threadData[threadData[threadData?.length - 1]]?.from_last_name}`}
              body={threadData[0]?.html_body?.length > 0 ? threadData[0]?.html_body : threadData[0]?.body}
              email={threadData[threadData?.length - 1]?.from_email}
              openedEditor={openedEditor}
              setOpenedEditor={setOpenedEditor}
              setHideTopButton={setHideTopButton}
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
                  inboxData={inboxData}
                  subject={threadData[threadData?.length - 1]?.subject}
                  fromEmail={threadData[threadData?.length - 1]?.from_email}
                  contactEmail={contactEmail}
                  setInboxData={setInboxData}
                  threadId={e?.thread_id}
                  message_header_id={e?.message_header_id}
                  sentDate={timeAgo(e?.sent_date)}
                  name={`${threadData[index]?.from_first_name} ${threadData[threadData[index]]?.from_last_name}`}
                  isLast={index === threadData?.slice(-2).length - 1}
                  body={e?.html_body?.length > 0 ? e?.html_body : e?.body}
                  email={threadData[index]?.from_email}
                  openedEditor={openedEditor}
                  setOpenedEditor={setOpenedEditor}
                  setHideTopButton={setHideTopButton}
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
          <div className={'email-area pt-[18px] pb-[24px]'} style={{ height: '89%', overflow: 'auto' }}>
            {threadData?.length <= 3 || showAll ? (
              threadData?.map((e, index) => (
                <React.Fragment key={index}>
                  <EmailItem
                    inboxData={inboxData}
                    fromEmail={threadData[threadData?.length - 1]?.from_email}
                    subject={threadData[threadData?.length - 1]?.subject}
                    contactEmail={contactEmail}
                    setInboxData={setInboxData}
                    threadId={e?.thread_id}
                    message_header_id={e?.message_header_id}
                    sentDate={timeAgo(e?.sent_date)}
                    name={`${threadData[index]?.from_first_name}  ${threadData[threadData[index]]?.from_last_name}`}
                    isLast={index === threadData?.length - 1}
                    body={e?.html_body?.length > 0 ? e?.html_body : e?.body}
                    email={threadData[index]?.from_email}
                    openedEditor={openedEditor}
                    setOpenedEditor={setOpenedEditor}
                    setHideTopButton={setHideTopButton}
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
