import Overlay from '@components/shared/overlay';
import Button from '@components/shared/button';
import React, { useEffect, useState } from 'react';
import RichtextEditor from '@components/Editor';
import { timeAgo } from '@global/functions';
import { getEmailsForSpecificContact, replyInThread, syncEmailOfContact } from '@api/email';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';

const EmailItem = ({ name, body, message_header_id, sentDate, threadId, subject, email, onBtnClick }) => {
  const allContacts = useSelector((state) => state.contacts.allContacts);
  const userInfo = useSelector((state) => state.global.userInfo);

  useEffect(() => {
    if (onBtnClick) {
      onBtnClick(threadId, subject, message_header_id);
    }
  }, []);

  return (
    <div className={'flex px-6 flex-col pt-4'}>
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
    </div>
  );
};

const EmailsPopup = ({ handleClose, contactEmail, singleEmail, setEmailData, resetPagination }) => {
  const [openedEditor, setOpenedEditor] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const _replyInThread = () => {
    setLoading(true);
    if (singleEmail || singleEmail?.thread_id || singleEmail?.message_header_id) {
      setMessage('');
      replyInThread(contactEmail, message, singleEmail?.message_header_id, singleEmail?.thread_id, singleEmail?.subject)
        .then(() => {
          syncEmailOfContact(contactEmail).then(() => {
            resetPagination();
          });
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    }
  };

  return (
    <Overlay
      alignStart
      className=" w-[792px]"
      handleCloseOverlay={handleClose}
      includeTitleBorder
      title={singleEmail?.subject?.length > 0 ? singleEmail?.subject : '(no subject)'}>
      <div
        className={'flex flex-col justify-between'}
        style={{ height: !openedEditor ? 'calc(100% - 74px)' : 'calc(100% - 74px)', overflow: 'auto' }}>
        <EmailItem
          subject={singleEmail?.subject}
          sentDate={timeAgo(singleEmail?.sent_date)}
          name={`${singleEmail?.from_first_name}  ${singleEmail?.from_last_name}`}
          body={singleEmail?.html_body?.length > 0 ? singleEmail?.html_body : singleEmail?.body}
          email={singleEmail?.from_email}
          openedEditor={openedEditor}
          setOpenedEditor={setOpenedEditor}
        />
        <div className={'flex flex-col gap-[18px] sticky bottom-0 px-6 bg-white z-10 pb-4 mt-2 '}>
          {openedEditor ? (
            <>
              <RichtextEditor
                height={270}
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
                onClick={() => {
                  _replyInThread();
                }}>
                Reply
              </Button>
            </>
          ) : (
            <Button darkBlue className={'bg-lightBlue3 w-[64px] h-[34px] mt-2'} onClick={() => setOpenedEditor(true)}>
              Reply
            </Button>
          )}
        </div>
      </div>
    </Overlay>
  );
};

export default EmailsPopup;
